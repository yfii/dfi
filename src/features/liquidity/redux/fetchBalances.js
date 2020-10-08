import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { erc20ABI } from "../../configure";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  STAKE_FETCH_BALANCE_BEGIN,
  STAKE_FETCH_BALANCE_SUCCESS,
  STAKE_FETCH_BALANCE_FAILURE,
} from './constants';

export function fetchBalances(index) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({
      type: STAKE_FETCH_BALANCE_BEGIN,
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
      const { home, stake } = getState();
      const { address, web3 } = home;
      const { pools } = stake;
      const { tokenAddress } = pools[index];
      const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
      contract.methods.balanceOf(address).call({ from: address }).then(
        data => {
          dispatch({
            type: STAKE_FETCH_BALANCE_SUCCESS,
            data: new BigNumber(data),
            index
          });
          resolve(data);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: STAKE_FETCH_BALANCE_FAILURE,
            index
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useFetchBalances() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { balance, fetchBalancesPending } = useSelector(
    state => ({
      balance: state.stake.balance,
      fetchBalancesPending: state.stake.fetchBalancesPending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchBalances(data)),
    [dispatch],
  );

  return {
    balance,
    fetchBalances: boundAction,
    fetchBalancesPending
  };
}

export function reducer(state, action) {
  const { balance, fetchBalancesPending } = state;
  switch (action.type) {
    case STAKE_FETCH_BALANCE_BEGIN:
      // Just after a request is sent
      fetchBalancesPending[action.index] = true;
      return {
        ...state,
        fetchBalancesPending,
      };

    case STAKE_FETCH_BALANCE_SUCCESS:
      // The request is success
      
      balance[action.index] = action.data;
      fetchBalancesPending[action.index] = false;
      return {
        ...state,
        balance,
        fetchBalancesPending,
      };

    case STAKE_FETCH_BALANCE_FAILURE:
      // The request is failed
      fetchBalancesPending[action.index] = false;
      return {
        ...state,
        fetchBalancesPending,
      };

    default:
      return state;
  }
}