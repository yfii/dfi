import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';
import {
  VAULT_FETCH_ZAP_ESTIMATE_BEGIN,
  VAULT_FETCH_ZAP_ESTIMATE_SUCCESS,
  VAULT_FETCH_ZAP_ESTIMATE_FAILURE,
} from './constants';
import { zapDepositEstimate, zapWithdrawEstimate } from '../../web3';
import { convertAmountToRawNumber } from 'features/helpers/bignumber';

export function fetchZapDepositEstimate({
  web3,
  zapAddress,
  vaultAddress,
  tokenAddress,
  tokenAmount,
}) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_ZAP_ESTIMATE_BEGIN,
      index: vaultAddress,
    });

    const promise = new Promise((resolve, reject) => {
      zapDepositEstimate({ web3, zapAddress, vaultAddress, tokenAddress, tokenAmount })
        .then(data => {
          dispatch({
            type: VAULT_FETCH_ZAP_ESTIMATE_SUCCESS,
            data: { zapEstimate: data },
            vaultAddress,
            index: vaultAddress,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_ZAP_ESTIMATE_FAILURE,
            index: vaultAddress,
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

export function fetchZapWithdrawEstimate({
  web3,
  vaultAddress,
  routerAddress,
  swapInput,
  swapOutput,
  pairToken,
  pairTokenAmount,
}) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_ZAP_ESTIMATE_BEGIN,
      index: pairToken.tokenAddress,
    });

    const totalSupply = new BigNumber(pairToken.totalSupply);
    const shares = new BigNumber(pairTokenAmount);
    if (shares.isZero()) {
      return new Promise(resolve => {
        dispatch({
          type: VAULT_FETCH_ZAP_ESTIMATE_SUCCESS,
          data: {
            swapEstimate: {
              amountIn: 0,
              amountOut: 0,
              swapInput,
              swapOutput,
            },
          },
          vaultAddress,
          index: pairToken.tokenAddress,
        });
        resolve();
      });
    }

    const equity = shares.dividedBy(totalSupply);
    let amountIn, reserveIn, reserveOut;
    if (swapInput.address.toLowerCase() === pairToken.token0.toLowerCase()) {
      amountIn = equity.multipliedBy(pairToken.reserves[0]);
      reserveIn = pairToken.reserves[0];
      reserveOut = pairToken.reserves[1];
    }
    if (swapInput.address.toLowerCase() === pairToken.token1.toLowerCase()) {
      amountIn = equity.multipliedBy(pairToken.reserves[1]);
      reserveIn = pairToken.reserves[1];
      reserveOut = pairToken.reserves[0];
    }

    amountIn = convertAmountToRawNumber(amountIn, 0);

    const promise = new Promise((resolve, reject) => {
      zapWithdrawEstimate({ web3, routerAddress, amountIn, reserveIn, reserveOut, dispatch })
        .then(amountOut => {
          dispatch({
            type: VAULT_FETCH_ZAP_ESTIMATE_SUCCESS,
            data: {
              swapEstimate: {
                amountIn,
                amountOut,
                swapInput,
                swapOutput,
              },
            },
            vaultAddress,
            index: pairToken.tokenAddress,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_ZAP_ESTIMATE_FAILURE,
            index: pairToken.tokenAddress,
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchZapEstimate() {
  const dispatch = useDispatch();

  const { fetchZapEstimatePending } = useSelector(state => ({
    fetchZapEstimatePending: state.vault.fetchZapEstimatePending,
  }));

  const boundActionDeposit = useCallback(
    data => dispatch(fetchZapDepositEstimate(data)),
    [dispatch]
  );
  const boundActionWithdraw = useCallback(
    data => dispatch(fetchZapWithdrawEstimate(data)),
    [dispatch]
  );

  return {
    fetchZapDepositEstimate: boundActionDeposit,
    fetchZapWithdrawEstimate: boundActionWithdraw,
    fetchZapEstimatePending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_ZAP_ESTIMATE_BEGIN:
      return {
        ...state,
        fetchZapEstimatePending: {
          ...state.fetchZapEstimatePending,
          [action.index]: true,
        },
      };

    case VAULT_FETCH_ZAP_ESTIMATE_SUCCESS:
      const { pools } = state;
      const poolIndex = pools.findIndex(pool => pool.earnContractAddress == action.vaultAddress);
      pools[poolIndex] = {
        ...pools[poolIndex],
        ...action.data,
      };
      return {
        ...state,
        pools,
        fetchZapEstimatePending: {
          ...state.fetchZapEstimatePending,
          [action.index]: false,
        },
      };

    case VAULT_FETCH_ZAP_ESTIMATE_FAILURE:
      return {
        ...state,
        fetchZapEstimatePending: {
          ...state.fetchZapEstimatePending,
          [action.index]: false,
        },
      };

    default:
      return state;
  }
}
