import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  STAKE_FETCH_POOLS_INFO_BEGIN,
  STAKE_FETCH_POOLS_INFO_SUCCESS,
  STAKE_FETCH_POOLS_INFO_FAILURE,
} from './constants';

export function fetchPoolsInfo() {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: STAKE_FETCH_POOLS_INFO_BEGIN });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('https://api1.dfi.money/stake/pools/');

      doRequest.then(
        res => {
          dispatch({
            type: STAKE_FETCH_POOLS_INFO_SUCCESS,
            data: res.data.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({ type: STAKE_FETCH_POOLS_INFO_FAILURE });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function useFetchPoolsInfo() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { pools, poolsInfo, fetchPoolsInfoPending } = useSelector(
    state => ({
      pools: state.stake.pools,
      poolsInfo: state.stake.poolsInfo,
      fetchPoolsInfoPending: state.stake.fetchPoolsInfoPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(() => dispatch(fetchPoolsInfo()), [dispatch]);

  return {
    fetchPoolsInfo: boundAction,
    pools,
    poolsInfo,
    fetchPoolsInfoPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STAKE_FETCH_POOLS_INFO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPoolsInfoPending: true
      };

    case STAKE_FETCH_POOLS_INFO_SUCCESS:
      // The request is success
      return {
        ...state,
        poolsInfo: action.data,
        fetchPoolsInfoPending: false
      };

    case STAKE_FETCH_POOLS_INFO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPoolsInfoPending: false
      };

    default:
      return state;
  }
}