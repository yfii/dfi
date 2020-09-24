import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  STAKE_FETCH_CAN_WITHDRAW_TIME_BEGIN,
  STAKE_FETCH_CAN_WITHDRAW_TIME_SUCCESS,
  STAKE_FETCH_CAN_WITHDRAW_TIME_FAILURE,
} from './constants';

export function fetchCanWithdrawTime(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_FETCH_CAN_WITHDRAW_TIME_BEGIN,
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
      const { earnContractAbi, earnContractAddress } = pools[index];
      const contract = new web3.eth.Contract(earnContractAbi, earnContractAddress);
      contract.methods.canWithdrawTime(address).call({ from: address }).then(
        data => {
          dispatch({
            type: STAKE_FETCH_CAN_WITHDRAW_TIME_SUCCESS,
            data: Number(data),
            index
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: STAKE_FETCH_CAN_WITHDRAW_TIME_FAILURE,
            index
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useFetchCanWithdrawTime() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { canWithdrawTime, fetchCanWithdrawTimePending } = useSelector(
    state => ({
      canWithdrawTime: state.stake.canWithdrawTime,
      fetchCanWithdrawTimePending: state.stake.fetchCanWithdrawTimePending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchCanWithdrawTime(data)),
    [dispatch],
  );

  return {
    canWithdrawTime,
    fetchCanWithdrawTime: boundAction,
    fetchCanWithdrawTimePending
  };
}

export function reducer(state, action) {
  const { canWithdrawTime, fetchCanWithdrawTimePending } = state;
  switch (action.type) {
    case STAKE_FETCH_CAN_WITHDRAW_TIME_BEGIN:
      // Just after a request is sent
      fetchCanWithdrawTimePending[action.index] = true;
      return {
        ...state,
        fetchCanWithdrawTimePending,
      };

    case STAKE_FETCH_CAN_WITHDRAW_TIME_SUCCESS:
      // The request is success

      canWithdrawTime[action.index] = action.data;
      fetchCanWithdrawTimePending[action.index] = false;
      return {
        ...state,
        canWithdrawTime,
        fetchCanWithdrawTimePending,
      };

    case STAKE_FETCH_CAN_WITHDRAW_TIME_FAILURE:
      // The request is failed
      fetchCanWithdrawTimePending[action.index] = false;
      return {
        ...state,
        fetchCanWithdrawTimePending,
      };

    default:
      return state;
  }
}