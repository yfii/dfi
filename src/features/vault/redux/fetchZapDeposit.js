import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_DEPOSIT_BEGIN,
  VAULT_FETCH_DEPOSIT_SUCCESS,
  VAULT_FETCH_DEPOSIT_FAILURE,
} from './constants';
import { zapDeposit } from '../../web3';

export function fetchZapDeposit({
  address,
  web3,
  vaultAddress,
  isETH,
  tokenAddress,
  tokenAmount,
  zapAddress,
  swapAmountOutMin,
}) {
  const index = vaultAddress;

  return dispatch => {
    dispatch({
      type: VAULT_FETCH_DEPOSIT_BEGIN,
      index,
    });

    const promise = new Promise((resolve, reject) => {
      zapDeposit({
        web3,
        address,
        vaultAddress,
        isETH,
        tokenAddress,
        tokenAmount,
        zapAddress,
        swapAmountOutMin,
        dispatch,
      })
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

export function useFetchZapDeposit() {
  const dispatch = useDispatch();

  const { fetchZapDepositPending } = useSelector(state => ({
    fetchZapDepositPending: state.vault.fetchZapDepositPending,
  }));

  const boundActionZapDeposit = useCallback(
    data => {
      return dispatch(fetchZapDeposit(data));
    },
    [dispatch]
  );

  return {
    fetchZapDeposit: boundActionZapDeposit,
    fetchZapDepositPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_DEPOSIT_BEGIN:
      return {
        ...state,
        fetchZapDepositPending: {
          ...state.fetchZapDepositPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_DEPOSIT_SUCCESS:
      return {
        ...state,
        fetchZapDepositPending: {
          ...state.fetchZapDepositPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_DEPOSIT_FAILURE:
      return {
        ...state,
        fetchZapDepositPending: {
          ...state.fetchZapDepositPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
