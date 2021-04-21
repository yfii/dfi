import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { erc20ABI, multicallBnbShimABI } from 'features/configure';
import BigNumber from 'bignumber.js';
import { getNetworkMulticall } from 'features/helpers/getNetworkData';

export function fetchBalances({ address, web3, tokens, spender }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {

      const multicall = new MultiCall(web3, getNetworkMulticall());

      const calls = Object.entries(tokens).map(([symbol, token]) => {
        if (!token.tokenAddress) {
          const shimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
          const shimContract = new web3.eth.Contract(multicallBnbShimABI, shimAddress);
          return {
            balance: shimContract.methods.balanceOf(address),
            allowance: shimContract.methods.allowance(address, address),
            symbol: symbol,
          };
        } else {
          const tokenContract = new web3.eth.Contract(erc20ABI, token.tokenAddress);
          return {
            balance: tokenContract.methods.balanceOf(address),
            allowance: spender ? tokenContract.methods.allowance(address, spender) : '0',
            symbol: symbol,
          };
        }
      });

      multicall
        .all([calls])
        .then(([results]) => {
          const newTokens = {};
          results.forEach(result => {
            newTokens[result.symbol] = {
              ...tokens[result.symbol],
              tokenBalance: new BigNumber(result.balance).toNumber() || 0,
              allowance: {
                ...tokens[result.symbol].allowance,
                ...(spender ? {[spender]: result.allowance} : tokens[result.symbol].allowance),
              },
            };
          })
          console.log(newTokens['CAKE']);

          dispatch({
            type: VAULT_FETCH_BALANCES_SUCCESS,
            data: newTokens,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_BALANCES_FAILURE,
          });
          return reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchBalances() {
  const dispatch = useDispatch();

  const { tokens, fetchBalancesPending, fetchBalancesDone } = useSelector(
    state => ({
      tokens: state.vault.tokens,
      fetchBalancesDone: state.vault.fetchBalancesDone,
      fetchBalancesPending: state.vault.fetchBalancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchBalances(data));
    },
    [dispatch]
  );

  return {
    tokens,
    fetchBalances: boundAction,
    fetchBalancesDone,
    fetchBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_BALANCES_BEGIN:
      return {
        ...state,
        fetchBalancesPending: true,
      };

    case VAULT_FETCH_BALANCES_SUCCESS:
      return {
        ...state,
        tokens: action.data,
        fetchBalancesDone: true,
        fetchBalancesPending: false,
      };

    case VAULT_FETCH_BALANCES_FAILURE:
      return {
        ...state,
        fetchBalancesPending: false,
      };

    default:
      return state;
  }
}
