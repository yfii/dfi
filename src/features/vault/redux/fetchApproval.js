import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_APPROVAL_BEGIN,
  VAULT_FETCH_APPROVAL_SUCCESS,
  VAULT_FETCH_APPROVAL_FAILURE,
} from './constants';
import { approval } from '../../web3';

export function fetchApproval({ address, web3, tokenAddress, contractAddress, tokenSymbol }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_APPROVAL_BEGIN,
      tokenSymbol,
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
            data: { allowance: data },
            spender: contractAddress,
            tokenSymbol,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_APPROVAL_FAILURE,
            tokenSymbol,
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
          [action.tokenSymbol]: true,
        },
      };

    case VAULT_FETCH_APPROVAL_SUCCESS:
      const { tokens } = state;
      tokens[action.tokenSymbol].allowance[action.spender] = action.data.allowance;
      return {
        ...state,
        tokens,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.tokenSymbol]: false,
        },
      };

    case VAULT_FETCH_APPROVAL_FAILURE:
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.tokenSymbol]: false,
        },
      };

    default:
      return state;
  }
}
