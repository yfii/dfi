import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  STAKE_FETCH_CURRENTLY_STAKED_BEGIN,
  STAKE_FETCH_CURRENTLY_STAKED_SUCCESS,
  STAKE_FETCH_CURRENTLY_STAKED_FAILURE,
} from './constants';

export function fetchCurrentlyStaked(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_FETCH_CURRENTLY_STAKED_BEGIN,
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
      contract.methods.balanceOf(address).call({ from: address }).then(
        data => {
          dispatch({
            type: STAKE_FETCH_CURRENTLY_STAKED_SUCCESS,
            data: new BigNumber(data).toNumber(),
            index
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          console.log(error)
          dispatch({
            type: STAKE_FETCH_CURRENTLY_STAKED_FAILURE,
            index
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useFetchCurrentlyStaked() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { currentlyStaked, fetchCurrentlyStakedPending } = useSelector(
    state => ({
      currentlyStaked: state.stake.currentlyStaked,
      fetchCurrentlyStakedPending: state.stake.fetchCurrentlyStakedPending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchCurrentlyStaked(data)),
    [dispatch],
  );

  return {
    currentlyStaked,
    fetchCurrentlyStaked: boundAction,
    fetchCurrentlyStakedPending
  };
}

export function reducer(state, action) {
  const { currentlyStaked, fetchCurrentlyStakedPending } = state;
  switch (action.type) {
    case STAKE_FETCH_CURRENTLY_STAKED_BEGIN:
      // Just after a request is sent
      fetchCurrentlyStakedPending[action.index] = true;
      return {
        ...state,
        fetchCurrentlyStakedPending,
      };

    case STAKE_FETCH_CURRENTLY_STAKED_SUCCESS:
      // The request is success
      currentlyStaked[action.index] = action.data;
      fetchCurrentlyStakedPending[action.index] = false;
      return {
        ...state,
        currentlyStaked,
        fetchCurrentlyStakedPending,
      };

    case STAKE_FETCH_CURRENTLY_STAKED_FAILURE:
      // The request is failed
      fetchCurrentlyStakedPending[action.index] = false;
      return {
        ...state,
        fetchCurrentlyStakedPending,
      };

    default:
      return state;
  }
}