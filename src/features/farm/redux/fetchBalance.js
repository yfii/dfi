import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { erc20ABI } from "../../configure";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  FARM_FETCH_BALANCE_BEGIN,
  FARM_FETCH_BALANCE_SUCCESS,
  FARM_FETCH_BALANCE_FAILURE,
} from './constants';

export function fetchBalance(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: FARM_FETCH_BALANCE_BEGIN,
      index
    });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, farm } = getState();
      const { address, web3 } = home;
      const { pools } = farm;
      const { tokenAddress } = pools[index];
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
      contract.methods.balanceOf(address).call({ from: address }).then(
        data => {
          dispatch({
            type: FARM_FETCH_BALANCE_SUCCESS,
            data: new BigNumber(data),
            index
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: FARM_FETCH_BALANCE_FAILURE,
            index
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useFetchBalance() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { balance, fetchBalancePending } = useSelector(
    state => ({
      balance: state.farm.balance,
      fetchBalancePending: state.farm.fetchBalancePending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchBalance(data)),
    [dispatch],
  );

  return {
    balance,
    fetchBalance: boundAction,
    fetchBalancePending
  };
}

export function reducer(state, action) {
  const { balance, fetchBalancePending } = state;
  switch (action.type) {
    case FARM_FETCH_BALANCE_BEGIN:
      // Just after a request is sent
      fetchBalancePending[action.index] = true;
      return {
        ...state,
        fetchBalancePending,
      };

    case FARM_FETCH_BALANCE_SUCCESS:
      // The request is success
      
      balance[action.index] = action.data;
      fetchBalancePending[action.index] = false;
      return {
        ...state,
        balance,
        fetchBalancePending,
      };

    case FARM_FETCH_BALANCE_FAILURE:
      // The request is failed
      fetchBalancePending[action.index] = false;
      return {
        ...state,
        fetchBalancePending,
      };

    default:
      return state;
  }
}