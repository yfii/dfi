import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_CONTRACT_APY_BEGIN,
  VAULT_FETCH_CONTRACT_APY_SUCCESS,
  VAULT_FETCH_CONTRACT_APY_FAILURE,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function fetchContractApy() {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_CONTRACT_APY_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get('https://api.dfi.money/apy.json');

      doRequest.then(
        res => {
          dispatch({
            type: VAULT_FETCH_CONTRACT_APY_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: VAULT_FETCH_CONTRACT_APY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function useFetchContractApy() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { contractApy, fetchContractApyPending } = useSelector(
    state => ({
      contractApy: state.vault.contractApy,
      fetchContractApyPending: state.vault.fetchContractApyPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    () => {
      dispatch(fetchContractApy());
    },
    [dispatch],
  );

  return {
    contractApy,
    fetchContractApy: boundAction,
    fetchContractApyPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_CONTRACT_APY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchContractApyPending: true,
      };

    case VAULT_FETCH_CONTRACT_APY_SUCCESS:
      // The request is success
      return {
        ...state,
        contractApy: action.data,
        fetchContractApyPending: false,
      };

    case VAULT_FETCH_CONTRACT_APY_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchContractApyPending: false,
      };

    default:
      return state;
  }
}

