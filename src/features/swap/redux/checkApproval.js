import { useCallback } from 'react';
import { erc20ABI } from "../../configure";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  SWAP_CHECK_APPROVAL_BEGIN,
  SWAP_CHECK_APPROVAL_SUCCESS,
  SWAP_CHECK_APPROVAL_FAILURE,
} from './constants';
import { fetchAllowance } from "../../web3";
import async from 'async';

export function checkApproval() {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: SWAP_CHECK_APPROVAL_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // args.error here is only for test coverage purpose.
      const { home, swap } = getState();
      const { address, web3 } = home;
      const { allowance } = swap;

      async.map(allowance, (token, callback) => {
        const erc20Contract = new web3.eth.Contract(erc20ABI, token.address);
        async.map(token.pools, (pool, callbackInner) => {
          fetchAllowance({
            web3,
            contractAddress: pool.address,
            contract: erc20Contract,
            address
          }).then(
            data => {
              pool.allowance = data;
              return callbackInner(null, pool)
            }
          ).catch(
            error => {
              // console.log(error)
              return callbackInner(error, 0)
            }
          )
        }, (error, pools) => {
            if (error) {
              console.log(error)
            }
            token.pools = pools
            callback(null, token);
        })
      }, (error, allowance) => {
        if(error) {
          dispatch({
            type: SWAP_CHECK_APPROVAL_FAILURE,
          })
          return reject(error.message || error)
        }
        dispatch({
          type: SWAP_CHECK_APPROVAL_SUCCESS,
          data: allowance
        })
        resolve()
      })
    });

    return promise;
  }
}


export function useCheckApproval() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { allowance, checkApprovalPending } = useSelector(
    state => ({
      allowance: state.swap.allowance,
      checkApprovalPending: state.swap.checkApprovalPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    () => dispatch(checkApproval()),
    [dispatch],
  );

  return {
    allowance,
    checkApproval: boundAction,
    checkApprovalPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SWAP_CHECK_APPROVAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        checkApprovalPending: true,
      };

    case SWAP_CHECK_APPROVAL_SUCCESS:
      // The request is success
      return {
        ...state,
        allowance: action.data,
        checkApprovalPending: false,
      };

    case SWAP_CHECK_APPROVAL_FAILURE:
      // The request is failed
      return {
        ...state,
        checkApprovalPending: false,
      };

    default:
      return state;
  }
}