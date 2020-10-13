import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { erc20ABI } from "../../configure";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  LIQUIDITY_CHECK_APPROVAL_BEGIN,
  LIQUIDITY_CHECK_APPROVAL_SUCCESS,
  LIQUIDITY_CHECK_APPROVAL_FAILURE,
} from './constants';

export function checkApproval(poolIndex, tokenIndex) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: LIQUIDITY_CHECK_APPROVAL_BEGIN });
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
      if( canDepositTokenList[tokenIndex] === 'eth') return dispatch({ type: LIQUIDITY_CHECK_APPROVAL_SUCCESS, data: new BigNumber("79228162514"), poolIndex, tokenIndex })
      const contract = new web3.eth.Contract(erc20ABI, erc20Tokens[canDepositTokenList[tokenIndex]].tokenContractAddress);
      contract.methods.allowance(address, contractAddress).call({ from: address }).then(
        data => {
          const balance = web3.utils.fromWei(data, "ether");
          dispatch({
            type: LIQUIDITY_CHECK_APPROVAL_SUCCESS,
            data: new BigNumber(balance),
            poolIndex, tokenIndex
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: LIQUIDITY_CHECK_APPROVAL_FAILURE,
            poolIndex, tokenIndex
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useCheckApproval() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const boundAction = useCallback(
    (poolIndex, tokenIndex) => dispatch(checkApproval(poolIndex, tokenIndex)),
    [dispatch],
  );

  return {
    checkApproval: boundAction,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LIQUIDITY_CHECK_APPROVAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
      };

    case LIQUIDITY_CHECK_APPROVAL_SUCCESS:
      // The request is success
      const { pools } = state
      pools[action.poolIndex].canDepositTokenAllowanceList[action.tokenIndex] = action.data;
      return {
        ...state,
        pools
      };

    case LIQUIDITY_CHECK_APPROVAL_FAILURE:
      // The request is failed
      return {
        ...state,
      };

    default:
      return state;
  }
}