import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  STAKE_FETCH_STAKE_BEGIN,
  STAKE_FETCH_STAKE_FAILURE,
  STAKE_FETCH_STAKE_SUCCESS,
} from './constants';
import { enqueueSnackbar } from '../../common/redux/actions';
import { launchpools } from '../../helpers/getNetworkData';
import { updatePools } from './subscription';

export function fetchStake(id, amount) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_FETCH_STAKE_BEGIN,
      id,
    });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    return new Promise(async (resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home } = getState();
      const { address, web3 } = home;
      const { earnContractAbi, earnContractAddress } = launchpools[id];
      const contract = new web3.eth.Contract(earnContractAbi, earnContractAddress);

      contract.methods
        .stake(amount)
        .send({ from: address })
        .on('transactionHash', function (hash) {
          dispatch(
            enqueueSnackbar({
              message: hash,
              options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
              },
              hash,
            })
          );
        })
        .on('receipt', function (receipt) {
          dispatch(
            enqueueSnackbar({
              key: new Date().getTime() + Math.random(),
              message: 'success',
              options: {
                variant: 'success',
              },
              hash: receipt.transactionHash,
            })
          );
          dispatch({ type: STAKE_FETCH_STAKE_SUCCESS, id });
          dispatch(updatePools);
          resolve();
        })
        .on('error', function (error) {
          dispatch(
            enqueueSnackbar({
              message: error.message || error,
              options: {
                key: new Date().getTime() + Math.random(),
                variant: 'error',
              },
            })
          );
          dispatch({ type: STAKE_FETCH_STAKE_FAILURE, id });
          resolve();
        })
        .catch(error => {
          dispatch({ type: STAKE_FETCH_STAKE_FAILURE, id });
          reject(error);
        });
    });
  };
}

export function useFetchStake() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchStakePending } = useSelector(state => ({
    fetchStakePending: state.stake.fetchStakePending,
  }));

  const boundAction = useCallback((data, amount) => dispatch(fetchStake(data, amount)), [dispatch]);

  return {
    fetchStake: boundAction,
    fetchStakePending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STAKE_FETCH_STAKE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchStakePending: {
          ...state.fetchStakePending,
          [action.id]: true,
        },
      };

    case STAKE_FETCH_STAKE_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchStakePending: {
          ...state.fetchStakePending,
          [action.id]: false,
        },
      };

    case STAKE_FETCH_STAKE_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchStakePending: {
          ...state.fetchStakePending,
          [action.id]: false,
        },
      };

    default:
      return state;
  }
}
