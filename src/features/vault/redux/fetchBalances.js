import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_BALANCES_BEGIN,
  VAULT_FETCH_BALANCES_SUCCESS,
  VAULT_FETCH_BALANCES_FAILURE,
} from './constants';
import { MultiCall } from 'eth-multicall';
import { erc20ABI, balanceProxyBNB } from '../../configure';

export function fetchBalances(data) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_BALANCES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const { address, web3, tokens } = data;

      const tokensList = [];
      for (let key in tokens) {
        tokensList.push({
          token: key,
          tokenAddress: tokens[key].tokenAddress,
          tokenBalance: tokens[key].tokenBalance,
        });
      }

      const multicall = new MultiCall(web3, '0xB94858b0bB5437498F5453A16039337e5Fdc269C');

      const calls = tokensList.map(token => {
        if (!token.tokenAddress) {
          const bnbProxyContract = new web3.eth.Contract(
            balanceProxyBNB,
            '0x1d1c397FBe76f47A44D353b08Cd41CDAFcF75Bc6'
          );
          return {
            tokenBalance: bnbProxyContract.methods.balanceOf(address),
          };
        } else {
          const tokenContract = new web3.eth.Contract(erc20ABI, token.tokenAddress);
          return {
            tokenBalance: tokenContract.methods.balanceOf(address),
          };
        }
      });

      multicall
        .all([calls])
        .then(([results]) => {
          const newTokens = {};
          for (let i = 0; i < tokensList.length; i++) {
            newTokens[tokensList[i].token] = {
              tokenAddress: tokensList[i].tokenAddress,
              tokenBalance: results[i].tokenBalance || 0,
            };
          }

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

  const { tokens, fetchBalancesPending } = useSelector(
    state => ({
      tokens: state.vault.tokens,
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
