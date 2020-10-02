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
  return null;
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

