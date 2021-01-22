import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_DEPOSIT_BEGIN,
  VAULT_FETCH_DEPOSIT_SUCCESS,
  VAULT_FETCH_DEPOSIT_FAILURE,
} from './constants';
import { deposit, depositBnb } from '../../web3';

export function fetchDeposit({ address, web3, isAll, amount, contractAddress, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_DEPOSIT_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      deposit({ web3, address, isAll, amount, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_DEPOSIT_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_DEPOSIT_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function fetchDepositBnb({ address, web3, amount, contractAddress, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_DEPOSIT_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      depositBnb({ web3, address, amount, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_DEPOSIT_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_DEPOSIT_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function useFetchDeposit() {
  const dispatch = useDispatch();

  const { fetchDepositPending } = useSelector(state => ({
    fetchDepositPending: state.vault.fetchDepositPending,
  }));

  const boundAction = useCallback(
    data => {
      return dispatch(fetchDeposit(data));
    },
    [dispatch]
  );

  const boundAction2 = useCallback(
    data => {
      return dispatch(fetchDepositBnb(data));
    },
    [dispatch]
  );

  return {
    fetchDeposit: boundAction,
    fetchDepositBnb: boundAction2,
    fetchDepositPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_DEPOSIT_BEGIN:
      return {
        ...state,
        fetchDepositPending: {
          ...state.fetchDepositPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_DEPOSIT_SUCCESS:
      return {
        ...state,
        fetchDepositPending: {
          ...state.fetchDepositPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_DEPOSIT_FAILURE:
      return {
        ...state,
        fetchDepositPending: {
          ...state.fetchDepositPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
