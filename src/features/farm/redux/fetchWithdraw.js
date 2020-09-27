import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  FARM_FETCH_WITHDRAW_BEGIN,
  FARM_FETCH_WITHDRAW_SUCCESS,
  FARM_FETCH_WITHDRAW_FAILURE,
} from './constants';
import { enqueueSnackbar } from '../../common/redux/actions'

export function fetchWithdraw(index, amount) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: FARM_FETCH_WITHDRAW_BEGIN,
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
      const { home, farm } = getState();
      const { address, web3 } = home;
      const { pools } = farm;
      const { earnContractAbi, earnContractAddress } = pools[index];
      const contract = new web3.eth.Contract(earnContractAbi, earnContractAddress);

      contract.methods.withdraw(amount).send({ from: address }).on(
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
          dispatch({ type: FARM_FETCH_WITHDRAW_SUCCESS, index });
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
          dispatch({ type: FARM_FETCH_WITHDRAW_FAILURE, index });
          resolve();
        })
        .catch((error) => {
          dispatch({ type: FARM_FETCH_WITHDRAW_FAILURE, index });
          reject(error)
        })
    });
    return promise;
  }
}

export function useFetchWithdraw() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchWithdrawPending } = useSelector(
    state => ({
      fetchWithdrawPending: state.farm.fetchWithdrawPending,
    })
  );

  const boundAction = useCallback(
    (data, amount) => dispatch(fetchWithdraw(data, amount)),
    [dispatch],
  );

  return {
    fetchWithdraw: boundAction,
    fetchWithdrawPending
  };
}

export function reducer(state, action) {
  const { fetchWithdrawPending } = state;
  switch (action.type) {
    case FARM_FETCH_WITHDRAW_BEGIN:
      // Just after a request is sent
      fetchWithdrawPending[action.index] = true;
      return {
        ...state,
        fetchWithdrawPending,
      };

    case FARM_FETCH_WITHDRAW_SUCCESS:
      // The request is success
      fetchWithdrawPending[action.index] = false;
      return {
        ...state,
        fetchWithdrawPending,
      };

    case FARM_FETCH_WITHDRAW_FAILURE:
      // The request is failed
      fetchWithdrawPending[action.index] = false;
      return {
        ...state,
        fetchWithdrawPending,
      };

    default:
      return state;
  }
}