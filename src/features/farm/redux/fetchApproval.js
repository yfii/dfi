import { useCallback } from 'react';
import { erc20ABI } from "../../configure";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  FARM_FETCH_APPROVAL_BEGIN,
  FARM_FETCH_APPROVAL_SUCCESS,
  FARM_FETCH_APPROVAL_FAILURE,
} from './constants';
import { enqueueSnackbar } from '../../common/redux/actions';
import { checkApproval } from './action';

export function fetchApproval(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: FARM_FETCH_APPROVAL_BEGIN,
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
      const { tokenAddress, earnContractAddress } = pools[index];
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

      contract.methods.approve(earnContractAddress, web3.utils.toWei("79228162514", "ether")).send({ from: address }).on(
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
          dispatch({ type: FARM_FETCH_APPROVAL_SUCCESS, index });
          dispatch(checkApproval(index))
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
          dispatch({ type: FARM_FETCH_APPROVAL_FAILURE, index });
          resolve();
        })
        .catch((error) => {
          dispatch({ type: FARM_FETCH_APPROVAL_FAILURE, index });
          reject(error)
        })
    });
    return promise;
  }
}


export function useFetchApproval() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchApprovalPending } = useSelector(
    state => ({
      fetchApprovalPending: state.farm.fetchApprovalPending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchApproval(data)),
    [dispatch],
  );

  return {
    fetchApproval: boundAction,
    fetchApprovalPending
  };
}

export function reducer(state, action) {
  const { fetchApprovalPending } = state;
  switch (action.type) {
    case FARM_FETCH_APPROVAL_BEGIN:
      // Just after a request is sent
      fetchApprovalPending[action.index] = true;
      return {
        ...state,
        fetchApprovalPending,
      };

    case FARM_FETCH_APPROVAL_SUCCESS:
      // The request is success
      fetchApprovalPending[action.index] = false;
      return {
        ...state,
        fetchApprovalPending,
      };

    case FARM_FETCH_APPROVAL_FAILURE:
      // The request is failed
      fetchApprovalPending[action.index] = false;
      return {
        ...state,
        fetchApprovalPending,
      };

    default:
      return state;
  }
}