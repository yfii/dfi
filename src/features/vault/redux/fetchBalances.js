import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';
import { fetchBalance } from '../../web3';
import async from 'async';

export function fetchBalances(data) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const { address, web3, tokens } = data;

      const newTokens = [];
      for (let key in tokens) {
        newTokens.push({
          token: key,
          tokenAddress: tokens[key].tokenAddress,
          tokenBalance: tokens[key].tokenBalance,
        });
      }
      async.map(
        newTokens,
        (token, callback) => {
          async.parallel(
            [
              callbackInner => {
                fetchBalance({
                  web3,
                  address,
                  tokenAddress: token.tokenAddress,
                })
                  .then(data => callbackInner(null, data))
                  .catch(error => {
                    return callbackInner(error.message || error);
                  });
              },
            ],
            (error, data) => {
              token.tokenBalance = data[0] || 0;
              callback(null, token);
            }
          );
        },
        (error, tokens) => {
          if (error) {
            dispatch({
              type: VAULT_FETCH_BALANCES_FAILURE,
            });
            return reject(error.message || error);
          }
          const newTokens = {};
          for (let i = 0; i < tokens.length; i++) {
            newTokens[tokens[i].token] = {
              tokenAddress: tokens[i].tokenAddress,
              tokenBalance: tokens[i].tokenBalance,
            };
          }
          dispatch({
            type: VAULT_FETCH_BALANCES_SUCCESS,
            data: newTokens,
          });
          resolve();
        }
      );
    });

    return promise;
  };
}

export function useFetchBalances() {
  const dispatch = useDispatch();

  const { tokens, fetchBalancesPending } = useSelector(
    state => ({
      tokens: state.vault.tokens,
      fetchBalancesPending: state.vault.fetchBalancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchBalances(data));
    },
    [dispatch]
  );

  return {
    tokens,
    fetchBalances: boundAction,
    fetchBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_BALANCES_BEGIN:
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case VAULT_FETCH_BALANCES_SUCCESS:
      return {
        ...state,
        tokens: action.data,
        fetchBalancesPending: false,
      };

    case VAULT_FETCH_BALANCES_FAILURE:
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}
