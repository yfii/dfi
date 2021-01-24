import { useCallback } from 'react';
import { vaultABI } from '../../configure';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_POOL_BALANCES_BEGIN,
  VAULT_FETCH_POOL_BALANCES_SUCCESS,
  VAULT_FETCH_POOL_BALANCES_FAILURE,
} from './constants';
import { fetchTvl } from '../../web3';
import async from 'async';

export function fetchPoolBalances({ web3, pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_POOL_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      async.map(
        pools,
        (pool, callback) => {
          const earnContract = new web3.eth.Contract(vaultABI, pool.earnContractAddress);
          async.parallel(
            [
              callbackInner => {
                fetchTvl({
                  contract: earnContract,
                })
                  .then(data => {
                    return callbackInner(null, data);
                  })
                  .catch(error => {
                    return callbackInner(error, 0);
                  });
              },
            ],
            (error, data) => {
              if (error) {
                console.log(error);
              }
              pool.tvl = data[0] || 0;
              callback(null, pool);
            }
          );
        },
        (error, pools) => {
          if (error) {
            dispatch({
              type: VAULT_FETCH_POOL_BALANCES_FAILURE,
            });
            return reject(error.message || error);
          }
          dispatch({
            type: VAULT_FETCH_POOL_BALANCES_SUCCESS,
            data: pools,
          });
          resolve();
        }
      );
    });

    return promise;
  };
}

export function useFetchPoolBalances() {
  const dispatch = useDispatch();

  const { pools, fetchPoolBalancesPending } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchPoolBalancesPending: state.vault.fetchPoolBalancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchPoolBalances(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchPoolBalances: boundAction,
    fetchPoolBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_POOL_BALANCES_BEGIN:
      return {
        ...state,
        fetchPoolBalancesPending: true,
      };

    case VAULT_FETCH_POOL_BALANCES_SUCCESS:
      return {
        ...state,
        pools: action.data,
        fetchPoolBalancesPending: false,
      };

    case VAULT_FETCH_POOL_BALANCES_FAILURE:
      return {
        ...state,
        fetchPoolBalancesPending: false,
      };

    default:
      return state;
  }
}
