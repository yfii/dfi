import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_APPROVAL_BEGIN,
  VAULT_FETCH_APPROVAL_SUCCESS,
  VAULT_FETCH_APPROVAL_FAILURE,
} from './constants';
import { approval } from "../../web3";

export function fetchApproval({ address, web3, tokenAddress, contractAddress, index }) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_APPROVAL_BEGIN,
      index
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/vault/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      approval({
        web3,
        address,
        tokenAddress,
        contractAddress,
        dispatch
      }).then(
        data => {
          dispatch({
            type: VAULT_FETCH_APPROVAL_SUCCESS,
            data: {index, allowance: data},index
          })
          resolve();
        }
      ).catch(
        error => {
          dispatch({
            type: VAULT_FETCH_APPROVAL_FAILURE,
            index
          })
          reject(error.message || error);
        }
      )
    });

    return promise;
  };
}

export function useFetchApproval() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchApprovalPending } = useSelector(
    state => ({
      fetchApprovalPending: state.vault.fetchApprovalPending,
    })
  );

  const boundAction = useCallback(data => dispatch(fetchApproval(data)), [dispatch]);

  return {
    fetchApproval: boundAction,
    fetchApprovalPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_APPROVAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.index]: true
        },
      };

    case VAULT_FETCH_APPROVAL_SUCCESS:
      // The request is success
      const { pools } = state;
      pools[action.index].allowance = action.data.allowance;
      return {
        ...state,
        pools,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.index]: false
        },
      };

    case VAULT_FETCH_APPROVAL_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.index]: false
        },
      };

    default:
      return state;
  }
}