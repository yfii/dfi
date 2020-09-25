import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SWAP_FETCH_APPROVAL_BEGIN,
  SWAP_FETCH_APPROVAL_SUCCESS,
  SWAP_FETCH_APPROVAL_FAILURE,
} from './constants';
import { approval } from "../../web3";

export function fetchApproval(token, contract) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: SWAP_FETCH_APPROVAL_BEGIN });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/vault/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, swap } = getState();
      const { address, web3 } = home;
      const { allowance } = swap;
      const item = allowance.filter(item => { return item.name === token })[0]
      console.log(item)
      const tokenAddress = item.address
      const contractAddress = item.pools.filter(item => { return item.name === contract })[0].address
      console.log(tokenAddress)
      console.log(contractAddress)
      approval({
        web3,
        address,
        tokenAddress,
        contractAddress,
        dispatch
      }).then(
        () => {
          const newAllowance = allowance.map(item => {
            if (item.name === token) {
              item.pools = item.pools.map(pool => {
                if(pool.name === contract) {
                  pool.allowance = 79228162514
                }
                return pool;
              })
            }
            return item
          });
          dispatch({
            type: SWAP_FETCH_APPROVAL_SUCCESS,
            data: newAllowance
          })
          resolve();
        }
      ).catch(
        error => {
          dispatch({
            type: SWAP_FETCH_APPROVAL_FAILURE,
          })
          reject(error.message || error);
        }
      )
    });

    return promise;
  };
}

export function useFetchApproval() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { fetchApprovalPending } = useSelector(
    state => ({
      fetchApprovalPending: state.swap.fetchApprovalPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((token, contract) => dispatch(fetchApproval(token, contract)), [dispatch]);

  return {
    fetchApproval: boundAction,
    fetchApprovalPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SWAP_FETCH_APPROVAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchApprovalPending: true,
      };

    case SWAP_FETCH_APPROVAL_SUCCESS:
      // The request is success
      return {
        ...state,
        allowance: action.data,
        fetchApprovalPending: false
      };

    case SWAP_FETCH_APPROVAL_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchApprovalPending: false
      };

    default:
      return state;
  }
}