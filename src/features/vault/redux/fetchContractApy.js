import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_CONTRACT_APY_BEGIN,
  VAULT_FETCH_CONTRACT_APY_SUCCESS,
  VAULT_FETCH_CONTRACT_APY_FAILURE,
} from './constants';

export function fetchContractApy() {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_CONTRACT_APY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(`https://api.beefy.finance/apy`);

      doRequest.then(
        res => {
          dispatch({
            type: VAULT_FETCH_CONTRACT_APY_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: VAULT_FETCH_CONTRACT_APY_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });

    return promise;
  };
}

export function useFetchContractApy() {
  const dispatch = useDispatch();

  const { contractApy, fetchContractApyPending } = useSelector(
    state => ({
      contractApy: state.vault.contractApy,
      fetchContractApyPending: state.vault.fetchContractApyPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(() => {
    dispatch(fetchContractApy());
  }, [dispatch]);

  return {
    contractApy,
    fetchContractApy: boundAction,
    fetchContractApyPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_CONTRACT_APY_BEGIN:
      return {
        ...state,
        fetchContractApyPending: true,
      };

    case VAULT_FETCH_CONTRACT_APY_SUCCESS:
      return {
        ...state,
        contractApy: action.data,
        fetchContractApyPending: false,
      };

    case VAULT_FETCH_CONTRACT_APY_FAILURE:
      return {
        ...state,
        fetchContractApyPending: false,
      };

    default:
      return state;
  }
}
