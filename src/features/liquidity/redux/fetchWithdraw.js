import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  LIQUIDITY_FETCH_WITHDRAW_BEGIN,
  LIQUIDITY_FETCH_WITHDRAW_SUCCESS,
  LIQUIDITY_FETCH_WITHDRAW_FAILURE,
} from './constants';
import { notify } from '../../common'
import { earnContractABI } from '../config'

export function fetchWithdraw(amount, poolIndex, tokenIndex, isAll) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: LIQUIDITY_FETCH_WITHDRAW_BEGIN, poolIndex, tokenIndex });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise(async (resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, liquidity } = getState();
      const { address, web3 } = home;
      const { pools } = liquidity;
      const { contractAddress, tokenWithdrawFunctionList, tokenWithdrawAllFunctionList} = pools[poolIndex];
      const contract = new web3.eth.Contract(earnContractABI, contractAddress);
      const func = isAll ? tokenWithdrawAllFunctionList[tokenIndex] : tokenWithdrawFunctionList[tokenIndex]
      if(isAll){
        return contract.methods[func]().send({ from: address }).on(
          'transactionHash', function(hash){
            notify.hash(hash)
          })
          .on('receipt', function(receipt){
            dispatch({ type: LIQUIDITY_FETCH_WITHDRAW_SUCCESS, poolIndex, tokenIndex });
            resolve();
          })
          .on('error', function(error) {
            dispatch({ type: LIQUIDITY_FETCH_WITHDRAW_FAILURE, poolIndex, tokenIndex });
            resolve();
          })
          .catch((error) => {
            dispatch({ type: LIQUIDITY_FETCH_WITHDRAW_FAILURE, poolIndex, tokenIndex });
            reject(error)
          })
      }
      contract.methods[func](amount).send({ from: address }).on(
        'transactionHash', function(hash){
          notify.hash(hash)
        })
        .on('receipt', function(receipt){
          dispatch({ type: LIQUIDITY_FETCH_WITHDRAW_SUCCESS, poolIndex, tokenIndex });
          resolve();
        })
        .on('error', function(error) {
          dispatch({ type: LIQUIDITY_FETCH_WITHDRAW_FAILURE, poolIndex, tokenIndex });
          resolve();
        })
        .catch((error) => {
          dispatch({ type: LIQUIDITY_FETCH_WITHDRAW_FAILURE, poolIndex, tokenIndex });
          reject(error)
        })
    });
    return promise;
  }
}


export function useFetchWithdraw() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const boundAction = useCallback(
    (amount, poolIndex, tokenIndex, isAll = false) => dispatch(fetchWithdraw(amount, poolIndex, tokenIndex, isAll)),
    [dispatch],
  );

  return {
    fetchWithdraw: boundAction,
  };
}

export function reducer(state, action) {
  const { pools } = state;
  switch (action.type) {
    case LIQUIDITY_FETCH_WITHDRAW_BEGIN:
      // Just after a request is sent
      pools[action.poolIndex].fetchWithdrawPending[action.tokenIndex] = true;
      return { ...state, pools };

    case LIQUIDITY_FETCH_WITHDRAW_SUCCESS:
      // The request is success
      pools[action.poolIndex].fetchWithdrawPending[action.tokenIndex] = false;
      return { ...state, pools };

    case LIQUIDITY_FETCH_WITHDRAW_FAILURE:
      // The request is failed
      pools[action.poolIndex].fetchWithdrawPending[action.tokenIndex] = false;
      return { ...state, pools };

    default:
      return state;
  }
}