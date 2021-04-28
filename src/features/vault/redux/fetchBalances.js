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
import { byDecimals } from 'features/helpers/bignumber';
import { getNetworkMulticall } from 'features/helpers/getNetworkData';

export function fetchBalances({ address, web3, tokens }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {

      const multicall = new MultiCall(web3, getNetworkMulticall());

      const balanceCalls = [];
      const allowanceCalls = [];

      Object.entries(tokens).forEach(([symbol, token]) => {
        if (!token.tokenAddress) {
          const shimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
          const shimContract = new web3.eth.Contract(multicallBnbShimABI, shimAddress);
          balanceCalls.push({
            balance: shimContract.methods.balanceOf(address),
            symbol: symbol,
          });
        } else {
          const tokenContract = new web3.eth.Contract(erc20ABI, token.tokenAddress);
          balanceCalls.push({
            balance: tokenContract.methods.balanceOf(address),
            symbol: symbol,
          });
          Object.entries(token.allowance).forEach(([spender]) => {
            allowanceCalls.push({
              allowance: tokenContract.methods.allowance(address, spender),
              spender: spender,
              symbol: symbol,
            });
          })
        }
      });

      multicall
        .all([balanceCalls, allowanceCalls])
        .then(([balanceResults, allowanceResults]) => {

          const newTokens = {};

          balanceResults.forEach(balanceResult => {
            newTokens[balanceResult.symbol] = {
              ...tokens[balanceResult.symbol],
              tokenBalance: new BigNumber(balanceResult.balance).toNumber() || 0,
            }
          })

          allowanceResults.forEach(allowanceResult => {
            newTokens[allowanceResult.symbol] = {
              ...newTokens[allowanceResult.symbol],
              allowance: {
                ...newTokens[allowanceResult.symbol].allowance,
                [allowanceResult.spender]: allowanceResult.allowance,
              },
            }
          })

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

  const tokenBalance = tokenSymbol => {
    return byDecimals(tokens[tokenSymbol]?.tokenBalance || 0, tokens[tokenSymbol].decimals);
  }

  return {
    tokens,
    tokenBalance: tokenBalance,
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
      const newAndUpdatedTokens = {};
      Object.entries(action.data).forEach(([symbol, token]) => {
        newAndUpdatedTokens[symbol] = {
          ...token,
          allowance: {
            ...state.tokens[symbol]?.allowance,
            ...token.allowance,
          },
        }
      });

      return {
        ...state,
        tokens: {
          ...state.tokens,
          ...newAndUpdatedTokens,
        },
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
