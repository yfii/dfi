import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VAULT_FETCH_STRATEGY_HARVEST_BEGIN,
  VAULT_FETCH_STRATEGY_HARVEST_SUCCESS,
  VAULT_FETCH_STRATEGY_HARVEST_FAILURE,
} from './constants';
import { harvest } from '../../web3';

export function fetchHarvest({ address, web3, contractAddress, index }) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_STRATEGY_HARVEST_BEGIN,
      index,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      harvest({ web3, address, vaultContractAddress: contractAddress, dispatch })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_STRATEGY_HARVEST_SUCCESS,
            data,
            index,
          });
          resolve(data);
        })
        .catch(
          // Use rejectHandler as the second argument so that render errors won't be caught.
          error => {
            dispatch({
              type: VAULT_FETCH_STRATEGY_HARVEST_FAILURE,
              index,
            });
            reject(error.message || error);
          }
        );
    });
    return promise;
  };
}

export function useFetchHarvest() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchHarvestPending } = useSelector(state => ({
    fetchHarvestPending: state.vault.fetchHarvestPending,
  }));

  const boundAction = useCallback(data => dispatch(fetchHarvest(data)), [dispatch]);

  return {
    fetchHarvest: boundAction,
    fetchHarvestPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_STRATEGY_HARVEST_BEGIN:
      return {
        ...state,
        fetchHarvestPending: {
          ...state.fetchHarvestPending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_STRATEGY_HARVEST_SUCCESS:
      return {
        ...state,
        fetchHarvestPending: {
          ...state.fetchHarvestPending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_STRATEGY_HARVEST_FAILURE:
      return {
        ...state,
        fetchHarvestPending: {
          ...state.fetchHarvestPending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
