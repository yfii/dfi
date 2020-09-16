import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SWAP_FETCH_BALANCES_BEGIN,
  SWAP_FETCH_BALANCES_SUCCESS,
  SWAP_FETCH_BALANCES_FAILURE,
} from './constants';
import { fetchBalance } from "../../web3";
import async from 'async';

export function fetchBalances(data) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: SWAP_FETCH_BALANCES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/vault/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, swap } = getState();
      const { address, web3 } = home;
      const { tokens } = swap

      async.map(tokens, (token, callback) => {
        fetchBalance({
          web3,
          address,
          tokenAddress: token.address
        }).then(
          data => {
            token.balance = data
            return callback(null, token)
          }
        ).catch(
          error => {
            return callback(error.message || error)
          }
        )
      }, (error, callBackTokens) => {
        if(error) {
          console.log(error)
          dispatch({
            type: SWAP_FETCH_BALANCES_FAILURE,
          })
          return reject(error.message || error)
        }        
        dispatch({
          type: SWAP_FETCH_BALANCES_SUCCESS,
          data: callBackTokens,
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
      tokens: state.swap.tokens,
      fetchBalancesPending: state.swap.fetchBalancesPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => dispatch(fetchBalances()), [dispatch]);

  return {
    tokens,
    fetchBalances: boundAction,
    fetchBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SWAP_FETCH_BALANCES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case SWAP_FETCH_BALANCES_SUCCESS:
      // The request is success
      return {
        ...state,
        tokens: action.data,
        fetchBalancesPending: false,
      };

    case SWAP_FETCH_BALANCES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}