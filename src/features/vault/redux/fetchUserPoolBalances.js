import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_USER_POOL_BALANCES_BEGIN,
  VAULT_FETCH_USER_POOL_BALANCES_SUCCESS,
  VAULT_FETCH_USER_POOL_BALANCES_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { erc20ABI, vaultABI } from '../../configure';
import BigNumber from 'bignumber.js';
import async from 'async';
import { byDecimals } from 'features/helpers/bignumber';

export function fetchUserPoolBalances({ address, web3, pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_USER_POOL_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, '0xB94858b0bB5437498F5453A16039337e5Fdc269C');

      const allowanceCalls = pools.map(pool => {
        const bnbShimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
        const token = new web3.eth.Contract(erc20ABI, pool.tokenAddress || bnbShimAddress);
        return {
          allowance: token.methods.allowance(address, pool.earnContractAddress),
        };
      });

      const pricePerFullShareCalls = pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);
        return {
          pricePerFullShare: vault.methods.getPricePerFullShare(),
        };
      });

      async.parallel(
        [
          callbackInner => {
            multicall
              .all([allowanceCalls])
              .then(([data]) => callbackInner(null, data))
              .catch(error => {
                return callbackInner(error.message || error);
              });
          },
          callbackInner => {
            multicall
              .all([pricePerFullShareCalls])
              .then(([data]) => callbackInner(null, data))
              .catch(error => {
                return callbackInner(error.message || error);
              });
          },
        ],
        (error, data) => {
          if (error) {
            dispatch({
              type: VAULT_FETCH_USER_POOL_BALANCES_FAILURE,
            });
            return reject(error.message || error);
          }

          const newPools = pools.map((pool, i) => {
            const allowance = web3.utils.fromWei(data[0][i].allowance, 'ether');
            const pricePerFullShare = byDecimals(data[1][i].pricePerFullShare, 18).toNumber();
            return {
              ...pool,
              allowance: new BigNumber(allowance).toNumber() || 0,
              pricePerFullShare: new BigNumber(pricePerFullShare).toNumber() || 1,
            };
          });

          dispatch({
            type: VAULT_FETCH_USER_POOL_BALANCES_SUCCESS,
            data: newPools,
          });
          resolve();
        }
      );
    });

    return promise;
  };
}

export function useFetchUserPoolBalances() {
  const dispatch = useDispatch();

  const { pools, fetchUserPoolBalancesPending } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchUserPoolBalancesPending: state.vault.fetchUserPoolBalancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchUserPoolBalances(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchUserPoolBalances: boundAction,
    fetchUserPoolBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_USER_POOL_BALANCES_BEGIN:
      return {
        ...state,
        fetchUserPoolBalancesPending: true,
      };

    case VAULT_FETCH_USER_POOL_BALANCES_SUCCESS:
      return {
        ...state,
        pools: action.data,
        fetchUserPoolBalancesPending: false,
      };

    case VAULT_FETCH_USER_POOL_BALANCES_FAILURE:
      return {
        ...state,
        fetchUserPoolBalancesPending: false,
      };

    default:
      return state;
  }
}
