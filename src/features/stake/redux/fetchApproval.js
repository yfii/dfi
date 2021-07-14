import { useCallback } from 'react';
import { erc20ABI } from '../../configure';
import { useDispatch, useSelector } from 'react-redux';
import {
  STAKE_FETCH_APPROVAL_BEGIN,
  STAKE_FETCH_APPROVAL_FAILURE,
  STAKE_FETCH_APPROVAL_SUCCESS,
} from './constants';
import { enqueueSnackbar } from '../../common/redux/actions';
import { updatePools } from './subscription';
import { launchpools } from '../../helpers/getNetworkData';

const UNLIMITED_APPROVAL = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export function fetchApproval(id) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_FETCH_APPROVAL_BEGIN,
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
      const { tokenAddress, earnContractAddress } = launchpools[id];
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

      contract.methods
        .approve(earnContractAddress, UNLIMITED_APPROVAL)
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
              message: 'Success',
              options: {
                variant: 'success',
              },
              hash: receipt.transactionHash,
            })
          );
          dispatch({ type: STAKE_FETCH_APPROVAL_SUCCESS, id });
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
          dispatch({ type: STAKE_FETCH_APPROVAL_FAILURE, id });
          resolve();
        })
        .catch(error => {
          dispatch({ type: STAKE_FETCH_APPROVAL_FAILURE, id });
          reject(error);
        });
    });
  };
}

export function useFetchApproval() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchApprovalPending } = useSelector(state => ({
    fetchApprovalPending: state.stake.fetchApprovalPending,
  }));

  const boundAction = useCallback(data => dispatch(fetchApproval(data)), [dispatch]);

  return {
    fetchApproval: boundAction,
    fetchApprovalPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STAKE_FETCH_APPROVAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.id]: true,
        },
      };

    case STAKE_FETCH_APPROVAL_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.id]: false,
        },
      };

    case STAKE_FETCH_APPROVAL_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchApprovalPending: {
          ...state.fetchApprovalPending,
          [action.id]: false,
        },
      };

    default:
      return state;
  }
}
