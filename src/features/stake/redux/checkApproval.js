import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { erc20ABI } from "../../configure";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  STAKE_CHECK_APPROVAL_BEGIN,
  STAKE_CHECK_APPROVAL_SUCCESS,
  STAKE_CHECK_APPROVAL_FAILURE,
} from './constants';

export function checkApproval(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_CHECK_APPROVAL_BEGIN,
      index
    });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, stake } = getState();
      const { address, web3 } = home;
      const { pools } = stake;
      const { tokenAddress, earnContractAddress } = pools[index];
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
      contract.methods.allowance(address, earnContractAddress).call({ from: address }).then(
        data => {
          const balance = web3.utils.fromWei(data, "ether");
          dispatch({
            type: STAKE_CHECK_APPROVAL_SUCCESS,
            data: new BigNumber(balance).toNumber(),
            index
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: STAKE_CHECK_APPROVAL_FAILURE,
            index
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

  const { allowance, checkApprovalPending } = useSelector(
    state => ({
      allowance: state.stake.allowance,
      checkApprovalPending: state.stake.checkApprovalPending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(checkApproval(data)),
    [dispatch],
  );

  return {
    allowance,
    checkApproval: boundAction,
    checkApprovalPending
  };
}

export function reducer(state, action) {
  const { allowance, checkApprovalPending } = state;
  switch (action.type) {
    case STAKE_CHECK_APPROVAL_BEGIN:
      // Just after a request is sent
      checkApprovalPending[action.index] = true;
      return {
        ...state,
        checkApprovalPending,
      };

    case STAKE_CHECK_APPROVAL_SUCCESS:
      // The request is success
      checkApprovalPending[action.index] = false;
      allowance[action.index] = action.data;
      return {
        ...state,
        allowance,
        checkApprovalPending,
      };

    case STAKE_CHECK_APPROVAL_FAILURE:
      // The request is failed
      checkApprovalPending[action.index] = false;
      return {
        ...state,
        checkApprovalPending,
      };

    default:
      return state;
  }
}