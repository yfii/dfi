import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { earnContractABI } from '../config'
import { useDispatch } from 'react-redux';
import {
  LIQUIDITY_FETCH_FULL_SHARE_BEGIN,
  LIQUIDITY_FETCH_FULL_SHARE_SUCCESS,
  LIQUIDITY_FETCH_FULL_SHARE_FAILURE,
} from './constants';
import { byDecimals } from 'features/helpers/bignumber';

export function fetchPricePerFullShare(poolIndex, tokenIndex) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: LIQUIDITY_FETCH_FULL_SHARE_BEGIN });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, liquidity } = getState();
      const { address, web3 } = home;
      const { pools, erc20Tokens } = liquidity;
      const { canDepositTokenList, contractAddress } = pools[poolIndex];
      const contract = new web3.eth.Contract(earnContractABI, contractAddress);
      contract.methods.getPricePerFullShare().call({ from: address }).then(
        data => {
          dispatch({
            type: LIQUIDITY_FETCH_FULL_SHARE_SUCCESS,
            data: data,
            poolIndex, tokenIndex
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: LIQUIDITY_FETCH_FULL_SHARE_FAILURE,
            poolIndex, tokenIndex
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useFetchPricePerFullShare() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const boundAction = useCallback(
    (poolIndex, tokenIndex) => dispatch(fetchPricePerFullShare(poolIndex, tokenIndex)),
    [dispatch],
  );

  return {
    fetchPricePerFullShare: boundAction,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LIQUIDITY_FETCH_FULL_SHARE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
      };

    case LIQUIDITY_FETCH_FULL_SHARE_SUCCESS:
      // The request is success
      const { pools } = state
      pools[action.poolIndex].pricePerFullShare = byDecimals(action.data, 18).toNumber();
      return {
        ...state,
        pools
      };

    case LIQUIDITY_FETCH_FULL_SHARE_FAILURE:
      // The request is failed
      return {
        ...state,
      };

    default:
      return state;
  }
}