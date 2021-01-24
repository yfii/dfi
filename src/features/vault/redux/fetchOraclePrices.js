import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_ORACLE_PRICES_BEGIN,
  VAULT_FETCH_ORACLE_PRICES_SUCCESS,
  VAULT_FETCH_ORACLE_PRICES_FAILURE,
} from './constants';
import { fetchPrice } from '../../web3';
import async from 'async';

export function fetchOraclePrices({ pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_ORACLE_PRICES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      async.map(
        pools,
        (pool, callback) => {
          async.parallel(
            [
              callbackInner => {
                fetchPrice({
                  id: pool.oracleId,
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
              pool.oraclePrice = data[0] || 0;
              callback(null, pool);
            }
          );
        },
        (error, pools) => {
          if (error) {
            dispatch({
              type: VAULT_FETCH_ORACLE_PRICES_FAILURE,
            });
            return reject(error.message || error);
          }
          console.log('Oracle', pools);
          dispatch({
            type: VAULT_FETCH_ORACLE_PRICES_SUCCESS,
            data: pools,
          });
          resolve();
        }
      );
    });

    return promise;
  };
}

export function useFetchOraclePrices() {
  const dispatch = useDispatch();

  const { pools, fetchOraclePricesPending } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchOraclePricesPending: state.vault.fetchOraclePricesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchOraclePrices(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchOraclePrices: boundAction,
    fetchOraclePricesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_ORACLE_PRICES_BEGIN:
      return {
        ...state,
        fetchOraclePricesPending: true,
      };

    case VAULT_FETCH_ORACLE_PRICES_SUCCESS:
      return {
        ...state,
        pools: action.data,
        fetchOraclePricesPending: false,
      };

    case VAULT_FETCH_ORACLE_PRICES_FAILURE:
      return {
        ...state,
        fetchOraclePricesPending: false,
      };

    default:
      return state;
  }
}
