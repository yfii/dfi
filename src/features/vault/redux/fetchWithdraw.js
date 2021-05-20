import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_WITHDRAW_BEGIN,
  VAULT_FETCH_WITHDRAW_SUCCESS,
  VAULT_FETCH_WITHDRAW_FAILURE,
} from './constants';
import { withdraw, withdrawBnb, zapWithdraw, zapWithdrawAndSwap } from '../../web3';

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

export function fetchZapWithdrawAndRemoveLiquidity({
  address,
  web3,
  vaultAddress,
  amount,
  zapAddress,
}) {
  const index = vaultAddress;

  return dispatch => {
    dispatch({
      type: VAULT_FETCH_WITHDRAW_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      zapWithdraw({ web3, address, vaultAddress, amount, zapAddress, dispatch })
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

export function fetchZapWithdrawAndSwap({
  address,
  web3,
  vaultAddress,
  amount,
  zapAddress,
  tokenOut,
  amountOutMin,
}) {
  const index = vaultAddress;

  return dispatch => {
    dispatch({
      type: VAULT_FETCH_WITHDRAW_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      zapWithdrawAndSwap({
        web3,
        address,
        vaultAddress,
        amount,
        zapAddress,
        tokenOut,
        amountOutMin,
        dispatch,
      })
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

  const boundWithdraw = useCallback(data => dispatch(fetchWithdraw(data)), [dispatch]);
  const boundWithdrawBnb = useCallback(data => dispatch(fetchWithdrawBnb(data)), [dispatch]);
  const boundZapWithdrawAndRemoveLiquidity = useCallback(
    data => dispatch(fetchZapWithdrawAndRemoveLiquidity(data)),
    [dispatch]
  );
  const boundZapWithdrawAndSwap = useCallback(
    data => dispatch(fetchZapWithdrawAndSwap(data)),
    [dispatch]
  );

  return {
    fetchWithdraw: boundWithdraw,
    fetchWithdrawBnb: boundWithdrawBnb,
    fetchZapWithdrawAndRemoveLiquidity: boundZapWithdrawAndRemoveLiquidity,
    fetchZapWithdrawAndSwap: boundZapWithdrawAndSwap,
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
