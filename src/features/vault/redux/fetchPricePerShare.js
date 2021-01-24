import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_PRICE_PER_SHARE_BEGIN,
  VAULT_FETCH_PRICE_PER_SHARE_SUCCESS,
  VAULT_FETCH_PRICE_PER_SHARE_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { vaultABI } from '../../configure';
import BigNumber from 'bignumber.js';
import { byDecimals } from 'features/helpers/bignumber';

export function fetchPricePerShare({ web3, pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_PRICE_PER_SHARE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, '0xB94858b0bB5437498F5453A16039337e5Fdc269C');

      const calls = pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);
        return {
          pricePerFullShare: vault.methods.getPricePerFullShare(),
        };
      });

      multicall
        .all([calls])
        .then(([results]) => {
          const newPools = pools.map((pool, i) => {
            const pricePerFullShare = byDecimals(results[i].pricePerFullShare, 18).toNumber();
            return {
              ...pool,
              pricePerFullShare: new BigNumber(pricePerFullShare).toNumber() || 1,
            };
          });

          dispatch({
            type: VAULT_FETCH_PRICE_PER_SHARE_SUCCESS,
            data: newPools,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_PRICE_PER_SHARE_FAILURE,
          });
          return reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchPricePerShare() {
  const dispatch = useDispatch();

  const { pools, fetchPricePerSharePending } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchPricePerSharePending: state.vault.fetchPricePerSharePending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchPricePerShare(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchPricePerShare: boundAction,
    fetchPricePerSharePending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_PRICE_PER_SHARE_BEGIN:
      return {
        ...state,
        fetchPricePerSharePending: true,
      };

    case VAULT_FETCH_PRICE_PER_SHARE_SUCCESS:
      return {
        ...state,
        pools: action.data,
        fetchPricePerSharePending: false,
      };

    case VAULT_FETCH_PRICE_PER_SHARE_FAILURE:
      return {
        ...state,
        fetchPricePerSharePending: false,
      };

    default:
      return state;
  }
}
