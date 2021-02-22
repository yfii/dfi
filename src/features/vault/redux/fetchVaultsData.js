import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import BigNumber from 'bignumber.js';
import async from 'async';
import { MultiCall } from 'eth-multicall';
import {
  VAULT_FETCH_VAULTS_DATA_BEGIN,
  VAULT_FETCH_VAULTS_DATA_SUCCESS,
  VAULT_FETCH_VAULTS_DATA_FAILURE,
} from './constants';
import { fetchPrice } from '../../web3';
import { erc20ABI, vaultABI } from '../../configure';
import { byDecimals } from 'features/helpers/bignumber';

export function fetchVaultsData({ address, web3, pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_VAULTS_DATA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, '0xB94858b0bB5437498F5453A16039337e5Fdc269C');

      const tokenCalls = pools.map(pool => {
        const bnbShimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
        const token = new web3.eth.Contract(erc20ABI, pool.tokenAddress || bnbShimAddress);
        return {
          allowance: token.methods.allowance(address, pool.earnContractAddress),
        };
      });

      const vaultCalls = pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);
        return {
          pricePerFullShare: vault.methods.getPricePerFullShare(),
          tvl: vault.methods.balance(),
        };
      });

      async.parallel(
        [
          callbackInner => {
            multicall
              .all([tokenCalls])
              .then(([data]) => callbackInner(null, data))
              .catch(error => {
                return callbackInner(error.message || error);
              });
          },
          callbackInner => {
            multicall
              .all([vaultCalls])
              .then(([data]) => callbackInner(null, data))
              .catch(error => {
                return callbackInner(error.message || error);
              });
          },
          callbackInner => {
            async.map(
              pools,
              (pool, callbackInnerInner) => {
                fetchPrice({
                  id: pool.oracleId,
                })
                  .then(data => {
                    return callbackInnerInner(null, data);
                  })
                  .catch(error => {
                    return callbackInnerInner(error, 0);
                  });
              },
              (error, data) => {
                if (error) {
                  return callbackInner(error.message || error);
                }
                callbackInner(null, data);
              }
            );
          },
        ],
        (error, data) => {
          if (error) {
            dispatch({
              type: VAULT_FETCH_VAULTS_DATA_FAILURE,
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
              tvl: byDecimals(data[1][i].tvl, 18).toNumber(),
              oraclePrice: data[2][i] || 0,
            };
          });

          dispatch({
            type: VAULT_FETCH_VAULTS_DATA_SUCCESS,
            data: newPools,
          });
          resolve();
        }
      );
    });

    return promise;
  };
}

export function useFetchVaultsData() {
  const dispatch = useDispatch();

  const { pools, fetchVaultsDataLoaded } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchVaultsData: state.vault.fetchVaultsData,
      fetchVaultsDataLoaded: state.vault.fetchVaultsDataLoaded,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchVaultsData(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchVaultsData: boundAction,
    fetchVaultsDataLoaded,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_VAULTS_DATA_BEGIN:
      return {
        ...state,
        fetchVaultsDataPending: true,
      };

    case VAULT_FETCH_VAULTS_DATA_SUCCESS:
      return {
        ...state,
        pools: action.data,
        fetchVaultsDataPending: false,
        fetchVaultsDataLoaded: true,
      };

    case VAULT_FETCH_VAULTS_DATA_FAILURE:
      return {
        ...state,
        fetchVaultsDataPending: false,
      };

    default:
      return state;
  }
}
