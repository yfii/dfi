import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_APPROVAL_BEGIN,
  VAULT_FETCH_APPROVAL_SUCCESS,
  VAULT_FETCH_APPROVAL_FAILURE,
} from './constants';
import { approval } from '../../web3';

export function fetchApproval({ address, web3, tokenAddress, contractAddress, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_APPROVAL_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      approval({
        web3,
        address,
        tokenAddress,
        contractAddress,
        dispatch,
      })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_APPROVAL_SUCCESS,
            data: { index, allowance: data },
            index,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_APPROVAL_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchApproval() {
  const dispatch = useDispatch();

  const { fetchApprovalPending } = useSelector(state => ({
    fetchApprovalPending: state.vault.fetchApprovalPending,
  }));

  const boundAction = useCallback(data => dispatch(fetchApproval(data)), [dispatch]);

  return {
    fetchApproval: boundAction,
    fetchApprovalPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_APPROVAL_BEGIN:
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_APPROVAL_SUCCESS:
      const { pools } = state;
      pools[action.index].allowance = action.data.allowance;
      return {
        ...state,
        pools,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_APPROVAL_FAILURE:
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
