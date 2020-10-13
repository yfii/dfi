import { useCallback } from 'react';
import BigNumber from "bignumber.js";
import { erc20ABI } from "../../configure";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  LIQUIDITY_FETCH_BALANCES_BEGIN,
  LIQUIDITY_FETCH_BALANCES_SUCCESS,
  LIQUIDITY_FETCH_BALANCES_FAILURE,
} from './constants';

export function fetchBalances() {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: LIQUIDITY_FETCH_BALANCES_BEGIN });
    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const { home, liquidity } = getState();
      const { address, web3 } = home;
      const { erc20Tokens } = liquidity;
      for (let name in erc20Tokens) {
        const contract = new web3.eth.Contract(erc20ABI, erc20Tokens[name].tokenContractAddress);
        contract.methods.balanceOf(address).call({ from: address }).then(
          data => {
            dispatch({
              type: LIQUIDITY_FETCH_BALANCES_SUCCESS,
              name,
              data: new BigNumber(data),
            });
            resolve(data);
          },
        ).catch(
          // Use rejectHandler as the second argument so that render errors won't be caught.
          error => {
            dispatch({
              type: LIQUIDITY_FETCH_BALANCES_FAILURE,
            });
            reject(error.message || error);
          }
        )
      }
    });
    return promise;
  }
}


export function useFetchBalances() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { erc20Tokens, fetchBalancesPending } = useSelector(
    state => ({
      erc20Tokens: state.liquidity.erc20Tokens,
      fetchBalancesPending: state.liquidity.fetchBalancesPending,
    })
  );

  const boundAction = useCallback(
    data => dispatch(fetchBalances(data)),
    [dispatch],
  );

  return {
    erc20Tokens,
    fetchBalances: boundAction,
    fetchBalancesPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case LIQUIDITY_FETCH_BALANCES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case LIQUIDITY_FETCH_BALANCES_SUCCESS:
      // The request is success
      return {
        ...state,
        erc20Tokens: {
          ...state.erc20Tokens,
          [action.name]: {
            ...state.erc20Tokens[action.name],
            tokenBalance: action.data
          }
        },
        fetchBalancesPending: false,
      };

    case LIQUIDITY_FETCH_BALANCES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}