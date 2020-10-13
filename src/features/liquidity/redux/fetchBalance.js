import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { useDispatch, useSelector } from 'react-redux';
import {
  LIQUIDITY_FETCH_BALANCE_BEGIN,
  LIQUIDITY_FETCH_BALANCE_SUCCESS,
  LIQUIDITY_FETCH_BALANCE_FAILURE,
} from './constants';

export function fetchBalance() {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: LIQUIDITY_FETCH_BALANCE_BEGIN });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home } = getState();
      const { address, web3 } = home;
      web3.eth.getBalance(address).then(
        data => {
          dispatch({
            type: LIQUIDITY_FETCH_BALANCE_SUCCESS,
            data: new BigNumber(data),
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({ type: LIQUIDITY_FETCH_BALANCE_FAILURE });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useFetchBalance() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { etherBalance, fetchBalancePending } = useSelector(
    state => ({
      etherBalance: state.liquidity.etherBalance,
      fetchBalancePending: state.liquidity.fetchBalancePending,
    })
  );

  const boundAction = useCallback(() => dispatch(fetchBalance()), [dispatch]);

  return {
    etherBalance,
    fetchBalance: boundAction,
    fetchBalancePending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LIQUIDITY_FETCH_BALANCE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchBalancePending: true,
      };

    case LIQUIDITY_FETCH_BALANCE_SUCCESS:
      // The request is success
      return {
        ...state,
        etherBalance: action.data,
        fetchBalancePending: false,
      };

    case LIQUIDITY_FETCH_BALANCE_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchBalancePending: false,
      };

    default:
      return state;
  }
}