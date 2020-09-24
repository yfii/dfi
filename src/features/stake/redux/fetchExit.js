import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  STAKE_FETCH_EXIT_BEGIN,
  STAKE_FETCH_EXIT_SUCCESS,
  STAKE_FETCH_EXIT_FAILURE,
} from './constants';
import { enqueueSnackbar } from '../../common/redux/actions'

export function fetchExit(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_FETCH_EXIT_BEGIN,
      index
    });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise(async (resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, stake } = getState();
      const { address, web3 } = home;
      const { pools } = stake;
      const { earnContractAbi, earnContractAddress } = pools[index];
      const contract = new web3.eth.Contract(earnContractAbi, earnContractAddress);

      contract.methods.exit().send({ from: address }).on(
        'transactionHash', function(hash){
          dispatch(enqueueSnackbar({
            message: hash,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success'
            },
            hash
          }));
        })
        .on('receipt', function(receipt){
          dispatch(enqueueSnackbar({
            key: new Date().getTime() + Math.random(),
            message: '交易确认',
            options: {
              variant: 'success',
            },
          }));
          dispatch({ type: STAKE_FETCH_EXIT_SUCCESS, index });
          resolve();
        })
        .on('error', function(error) {
          dispatch(enqueueSnackbar({
            message: error.message || error,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error'
            },
          }));
          dispatch({ type: STAKE_FETCH_EXIT_FAILURE, index });
          resolve();
        })
        .catch((error) => {
          dispatch({ type: STAKE_FETCH_EXIT_FAILURE, index });
          reject(error)
        })
    });
    return promise;
  }
}


export function useFetchExit() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchExitPending } = useSelector(
    state => ({
      fetchExitPending: state.stake.fetchExitPending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchExit(data)),
    [dispatch],
  );

  return {
    fetchExit: boundAction,
    fetchExitPending
  };
}

export function reducer(state, action) {
  const { fetchExitPending } = state;
  switch (action.type) {
    case STAKE_FETCH_EXIT_BEGIN:
      // Just after a request is sent
      fetchExitPending[action.index] = true;
      return {
        ...state,
        fetchExitPending,
      };

    case STAKE_FETCH_EXIT_SUCCESS:
      // The request is success
      fetchExitPending[action.index] = false;
      return {
        ...state,
        fetchExitPending,
      };

    case STAKE_FETCH_EXIT_FAILURE:
      // The request is failed
      fetchExitPending[action.index] = false;
      return {
        ...state,
        fetchExitPending,
      };

    default:
      return state;
  }
}