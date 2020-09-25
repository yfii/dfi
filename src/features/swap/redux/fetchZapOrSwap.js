import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SWAP_FETCH_ZAP_OR_SWAP_BEGIN,
  SWAP_FETCH_ZAP_OR_SWAP_SUCCESS,
  SWAP_FETCH_ZAP_OR_SWAP_FAILURE,
} from './constants';
import { zapOrSwap } from "../../web3";

export function fetchZapOrSwap(token, receiveToken, amount) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: SWAP_FETCH_ZAP_OR_SWAP_BEGIN });

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
      const { tokens } = swap;
      const item = tokens.filter(item => { return item.name === token })[0]
      console.log(item)
      const { abi, address: contractAddress, call} = item.pools.filter(item => { return item.name === receiveToken })[0].contract

      console.log(contractAddress)

      const contract = new web3.eth.Contract(abi, contractAddress);
      zapOrSwap({
        web3,
        address,
        contract,
        call,
        amount,
        zapOrSwap
      }).then(
        () => {
          dispatch({ type: SWAP_FETCH_ZAP_OR_SWAP_SUCCESS })
          resolve();
        }
      ).catch(
        error => {
          dispatch({
            type: SWAP_FETCH_ZAP_OR_SWAP_FAILURE,
          })
          reject(error.message || error);
        }
      )
    });

    return promise;
  };
}

export function useFetchZapOrSwap() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchZapOrSwapPending } = useSelector(
    state => ({
      fetchZapOrSwapPending: state.swap.fetchZapOrSwapPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((token, receiveToken, amount) => dispatch(fetchZapOrSwap(token, receiveToken, amount)), [dispatch]);

  return {
    fetchZapOrSwap: boundAction,
    fetchZapOrSwapPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SWAP_FETCH_ZAP_OR_SWAP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchZapOrSwapPending: true,
      };

    case SWAP_FETCH_ZAP_OR_SWAP_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchZapOrSwapPending: false
      };

    case SWAP_FETCH_ZAP_OR_SWAP_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchZapOrSwapPending: false
      };

    default:
      return state;
  }
}