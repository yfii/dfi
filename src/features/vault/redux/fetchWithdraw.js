import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_WITHDRAW_BEGIN,
  VAULT_FETCH_WITHDRAW_SUCCESS,
  VAULT_FETCH_WITHDRAW_FAILURE,
} from './constants';
import { withdraw, withdrawBnb } from '../../web3';

export function fetchWithdraw({ address, web3, isAll, amount, contractAddress, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_WITHDRAW_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      withdraw({ web3, address, isAll, amount, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function fetchWithdrawBnb({ address, web3, isAll, amount, contractAddress, index }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_WITHDRAW_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      withdrawBnb({ web3, address, isAll, amount, contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_WITHDRAW_FAILURE,
            index,
          });
          reject(error.message || error);
        });
    });
    return promise;
  };
}

export function useFetchWithdraw() {
  const dispatch = useDispatch();

  const { fetchWithdrawPending } = useSelector(state => ({
    fetchWithdrawPending: state.vault.fetchWithdrawPending,
  }));

  const boundAction = useCallback(data => dispatch(fetchWithdraw(data)), [dispatch]);

  const boundAction2 = useCallback(data => dispatch(fetchWithdrawBnb(data)), [dispatch]);

  return {
    fetchWithdraw: boundAction,
    fetchWithdrawBnb: boundAction2,
    fetchWithdrawPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_WITHDRAW_BEGIN:
      return {
        ...state,
        fetchWithdrawPending: {
          ...state.fetchWithdrawPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_WITHDRAW_SUCCESS:
      return {
        ...state,
        fetchWithdrawPending: {
          ...state.fetchWithdrawPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_WITHDRAW_FAILURE:
      return {
        ...state,
        fetchWithdrawPending: {
          ...state.fetchWithdrawPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
