import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BIFIBUYBACK_BEGIN,
  VAULT_FETCH_BIFIBUYBACK_SUCCESS,
  VAULT_FETCH_BIFIBUYBACK_FAILURE,
} from './constants';
import { getApiCacheBuster } from '../../web3/getApiCacheBuster';

export function fetchBifibuyback() {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_BIFIBUYBACK_BEGIN,
    });

    return new Promise((resolve, reject) => {
      const cacheBuster = getApiCacheBuster();
      const doRequest = axios.get(`https://api.beefy.finance/bifibuyback?_=${cacheBuster}`);

      doRequest.then(
        res => {
          dispatch({
            type: VAULT_FETCH_BIFIBUYBACK_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: VAULT_FETCH_BIFIBUYBACK_FAILURE,
            data: { error: err },
          });
          reject(err);
        }
      );
    });
  };
}

export function useFetchBifibuyback() {
  const dispatch = useDispatch();

  const { bifibuyback, fetchBifibuybackPending, fetchBifibuybackDone } = useSelector(
    state => ({
      bifibuyback: state.vault.bifibuyback,
      fetchBifibuybackDone: state.vault.fetchBifibuybackDone,
      fetchBifibuybackPending: state.vault.fetchBifibuybackPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(() => {
    dispatch(fetchBifibuyback());
  }, [dispatch]);

  return {
    bifibuyback,
    fetchBifibuyback: boundAction,
    fetchBifibuybackDone,
    fetchBifibuybackPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_BIFIBUYBACK_BEGIN:
      return {
        ...state,
        fetchBifibuybackPending: true,
      };

    case VAULT_FETCH_BIFIBUYBACK_SUCCESS:
      return {
        ...state,
        bifibuyback: action.data,
        fetchBifibuybackDone: true,
        fetchBifibuybackPending: false,
      };

    case VAULT_FETCH_BIFIBUYBACK_FAILURE:
      return {
        ...state,
        fetchBifibuybackPending: false,
      };

    default:
      return state;
  }
}
