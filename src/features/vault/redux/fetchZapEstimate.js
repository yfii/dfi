import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_ZAP_ESTIMATE_BEGIN,
  VAULT_FETCH_ZAP_ESTIMATE_SUCCESS,
  VAULT_FETCH_ZAP_ESTIMATE_FAILURE,
} from './constants';
import { zapEstimate } from '../../web3';

export function fetchZapEstimate({ web3, zapAddress, vaultAddress, tokenAddress, tokenAmount }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_ZAP_ESTIMATE_BEGIN,
      vaultAddress,
    });

    const promise = new Promise((resolve, reject) => {
      zapEstimate({ web3, zapAddress, vaultAddress, tokenAddress, tokenAmount, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_ZAP_ESTIMATE_SUCCESS,
            data: { zapEstimate: data },
            vaultAddress,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_ZAP_ESTIMATE_FAILURE,
            vaultAddress,
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchZapEstimate() {
  const dispatch = useDispatch();

  const { fetchZapEstimatePending } = useSelector(state => ({
    fetchZapEstimatePending: state.vault.fetchZapEstimatePending,
  }));

  const boundAction = useCallback(data => dispatch(fetchZapEstimate(data)), [dispatch]);

  return {
    fetchZapEstimate: boundAction,
    fetchZapEstimatePending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_ZAP_ESTIMATE_BEGIN:
      return {
        ...state,
        fetchZapEstimatePending: {
          ...state.fetchZapEstimatePending,
          [action.vaultAddress]: true,
        },
      };

    case VAULT_FETCH_ZAP_ESTIMATE_SUCCESS:
      const { pools } = state;
      const poolIndex = pools.findIndex(pool => pool.earnContractAddress == action.vaultAddress)
      pools[poolIndex].zapEstimate = action.data.zapEstimate;
      return {
        ...state,
        pools,
        fetchZapEstimatePending: {
          ...state.fetchZapEstimatePending,
          [action.vaultAddress]: false,
        },
      };

    case VAULT_FETCH_ZAP_ESTIMATE_FAILURE:
      return {
        ...state,
        fetchZapEstimatePending: {
          ...state.fetchZapEstimatePending,
          [action.vaultAddress]: false,
        },
      };

    default:
      return state;
  }
}
