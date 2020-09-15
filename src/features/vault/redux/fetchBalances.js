import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';
import { fetchBalance } from "../../web3";
import async from 'async';

export function fetchBalances(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/vault/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { address, web3, tokens } = data;

      const newTokens = [];
      for (let key in tokens) {
        newTokens.push({
          token: key,
          tokenAddress: tokens[key].tokenAddress,
          tokenBalance: tokens[key].tokenBalance,
        });
      }
      async.map(newTokens, (token, callback) => {
        async.parallel([
          (callbackInner) => { 
            fetchBalance({
              web3,
              address,
              tokenAddress: token.tokenAddress
            }).then(
              data => callbackInner(null, data)
            ).catch(
              error => {
                return callbackInner(error.message || error)
              }
            )
          }
        ], (error, data) => {
          token.tokenBalance = data[0] || 0
          callback(null, token)
        })
      }, (error, tokens) => {
        if(error) {
          console.log(error)
          dispatch({
            type: VAULT_FETCH_BALANCES_FAILURE,
          })
          return reject(error.message || error)
        }
        const newTokens = {};
        for(let i = 0; i < tokens.length; i++) {
          newTokens[tokens[i].token] = {
            tokenAddress: tokens[i].tokenAddress,
            tokenBalance: tokens[i].tokenBalance
          }
        }
        dispatch({
          type: VAULT_FETCH_BALANCES_SUCCESS,
          data: newTokens,
        })
        resolve()
      })
    });

    return promise;
  };
}

export function useFetchBalances() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { tokens, fetchBalancesPending } = useSelector(
    state => ({
      tokens: state.vault.tokens,
      fetchBalancesPending: state.vault.fetchBalancesPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (data) => {
      return dispatch(fetchBalances(data));
    },
    [dispatch],
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
      // Just after a request is sent
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case VAULT_FETCH_BALANCES_SUCCESS:
      // The request is success
      return {
        ...state,
        tokens: action.data,
        fetchBalancesPending: false,
      };

    case VAULT_FETCH_BALANCES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}