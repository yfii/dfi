import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  STAKE_FETCH_CLAIM_BEGIN,
  STAKE_FETCH_CLAIM_SUCCESS,
  STAKE_FETCH_CLAIM_FAILURE,
} from './constants';
import { enqueueSnackbar } from '../../common/redux/actions'

export function fetchClaim(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_FETCH_CLAIM_BEGIN,
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

      contract.methods.getReward().send({ from: address }).on(
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
          dispatch({ type: STAKE_FETCH_CLAIM_SUCCESS, index });
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
          dispatch({ type: STAKE_FETCH_CLAIM_FAILURE, index });
          resolve();
        })
        .catch((error) => {
          dispatch({ type: STAKE_FETCH_CLAIM_FAILURE, index});
          reject(error)
        })
    });
    return promise;
  }
}


export function useFetchClaim() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchClaimPending } = useSelector(
    state => ({
      fetchClaimPending: state.stake.fetchClaimPending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchClaim(data)),
    [dispatch],
  );

  return {
    fetchClaim: boundAction,
    fetchClaimPending
  };
}

export function reducer(state, action) {
  const { fetchClaimPending } = state;
  switch (action.type) {
    case STAKE_FETCH_CLAIM_BEGIN:
      // Just after a request is sent
      fetchClaimPending[action.index] = true;
      return {
        ...state,
        fetchClaimPending,
      };

    case STAKE_FETCH_CLAIM_SUCCESS:
      // The request is success
      fetchClaimPending[action.index] = false;
      return {
        ...state,
        fetchClaimPending,
      };

    case STAKE_FETCH_CLAIM_FAILURE:
      // The request is failed
      fetchClaimPending[action.index] = false;
      return {
        ...state,
        fetchClaimPending,
      };

    default:
      return state;
  }
}