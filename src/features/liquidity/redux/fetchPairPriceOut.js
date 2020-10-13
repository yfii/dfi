import { useCallback } from 'react';
import { earnContractABI } from '../config'
import { useDispatch } from 'react-redux';
import BigNumber from "bignumber.js";
import {
  LIQUIDITY_FETCH_PAIR_PRICE_OUT_BEGIN,
  LIQUIDITY_FETCH_PAIR_PRICE_OUT_SUCCESS,
  LIQUIDITY_FETCH_PAIR_PRICE_OUT_FAILURE,
  LIQUIDITY_FETCH_PAIR_PRICE_OUT_DONT_REQUEST,
} from './constants';
import { byDecimals } from 'features/helpers/bignumber';

export function fetchPairPriceOut(amountString, poolIndex, tokenIndex) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: LIQUIDITY_FETCH_PAIR_PRICE_OUT_BEGIN});
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
      const { pools, erc20Tokens } = liquidity;
      const { pairPrice, pairPriceToken, name, canDepositTokenList } = pools[poolIndex];
      if( canDepositTokenList[tokenIndex].includes(' lp') || amountString==0){
        if(amountString==0) amountString = Number(amountString)
        return dispatch({
          type: LIQUIDITY_FETCH_PAIR_PRICE_OUT_DONT_REQUEST,
          data: amountString,
          poolIndex, 
        });
        resolve(amountString);
      }
      let amount = new BigNumber(amountString).multipliedBy(new BigNumber(10).exponentiatedBy(erc20Tokens[name].tokenDecimals)).toString(10)
      const contract = new web3.eth.Contract(earnContractABI, pairPriceToken);
      const outToken = canDepositTokenList[tokenIndex]=='eth'?'0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2':erc20Tokens[canDepositTokenList[tokenIndex]].tokenContractAddress;
      contract.methods.out(erc20Tokens[name].tokenContractAddress, outToken, amount).call({ from: address }).then(
        data => {
          const selectedTokenName = canDepositTokenList[tokenIndex];
          const tokenDecimals = selectedTokenName=='eth'?18:erc20Tokens[selectedTokenName].tokenDecimals;
          const newData = byDecimals(data,tokenDecimals).toFixed(4);
          dispatch({
            type: LIQUIDITY_FETCH_PAIR_PRICE_OUT_SUCCESS,
            data: newData,
            poolIndex, 
          });
          resolve(newData);
        },
      ).catch(
        // Use rejectHandler as the second argument so that render errors won't be caught.
        error => {
          dispatch({
            type: LIQUIDITY_FETCH_PAIR_PRICE_OUT_FAILURE,
            poolIndex, 
          });
          reject(error.message || error);
        }
      )
    });
    return promise;
  }
}


export function useFetchPairPriceOut() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const boundAction = useCallback(
    (amountString, poolIndex, tokenIndex) => dispatch(fetchPairPriceOut(amountString, poolIndex, tokenIndex)),
    [dispatch],
  );

  return {
    fetchPairPriceOut: boundAction,
  };
}

export function reducer(state, action) {
  const { pools } = state;
  switch (action.type) {
    case LIQUIDITY_FETCH_PAIR_PRICE_OUT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
      };
    case LIQUIDITY_FETCH_PAIR_PRICE_OUT_SUCCESS:
    case LIQUIDITY_FETCH_PAIR_PRICE_OUT_DONT_REQUEST:
      // The request is success
      pools[action.poolIndex].pairPrice = action.data;
      return {
        ...state,
        pools
      };

    case LIQUIDITY_FETCH_PAIR_PRICE_OUT_FAILURE:
      // The request is failed
      return {
        ...state,
      };

    default:
      return state;
  }
}