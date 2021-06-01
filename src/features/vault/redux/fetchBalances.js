import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { erc20ABI, multicallABI, uniswapV2PairABI } from 'features/configure';
import { byDecimals } from 'features/helpers/bignumber';
import { getNetworkMulticall } from 'features/helpers/getNetworkData';

export function fetchBalances({ address, web3, tokens }) {
  return dispatch => {
    if (!(address && web3)) return;

    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, getNetworkMulticall());

      const balanceCalls = [];
      const allowanceCalls = [];

      Object.entries(tokens).forEach(([symbol, token]) => {
        if (!token.tokenAddress) {
          const multicallContract = new web3.eth.Contract(multicallABI, multicall.contract);
          balanceCalls.push({
            balance: multicallContract.methods.getEthBalance(address),
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
          });
        }
      });

      multicall
        .all([balanceCalls, allowanceCalls])
        .then(([balanceResults, allowanceResults]) => {
          const newTokens = {};

          balanceResults.forEach(balanceResult => {
            newTokens[balanceResult.symbol] = {
              ...tokens[balanceResult.symbol],
              tokenBalance: balanceResult.balance,
            };
          });

          allowanceResults.forEach(allowanceResult => {
            newTokens[allowanceResult.symbol] = {
              ...newTokens[allowanceResult.symbol],
              allowance: {
                ...newTokens[allowanceResult.symbol].allowance,
                [allowanceResult.spender]: allowanceResult.allowance,
              },
            };
          });

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

export function fetchPairReverves({ web3, pairToken }) {
  return dispatch => {
    if (!web3) return;

    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, getNetworkMulticall());
      const tokenContract = new web3.eth.Contract(uniswapV2PairABI, pairToken.tokenAddress);
      multicall
        .all([
          [
            {
              totalSupply: tokenContract.methods.totalSupply(),
              token0: tokenContract.methods.token0(),
              token1: tokenContract.methods.token1(),
              reserves: tokenContract.methods.getReserves(),
            },
          ],
        ])
        .then(([[result]]) => {
          const newPairToken = {
            [pairToken.symbol]: {
              ...pairToken,
              ...result,
            },
          };

          dispatch({
            type: VAULT_FETCH_BALANCES_SUCCESS,
            data: newPairToken,
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
  };

  const boundPairReverves = useCallback(
    data => {
      return dispatch(fetchPairReverves(data));
    },
    [dispatch]
  );

  return {
    tokens,
    tokenBalance: tokenBalance,
    fetchBalances: boundAction,
    fetchPairReverves: boundPairReverves,
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
          ...state.tokens[symbol],
          ...token,
          allowance: {
            ...state.tokens[symbol]?.allowance,
            ...token.allowance,
          },
        };
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
