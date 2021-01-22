import { useCallback } from 'react';
import { vaultABI, erc20ABI } from '../../configure';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  VAULT_FETCH_USER_POOL_BALANCES_BEGIN,
  VAULT_FETCH_USER_POOL_BALANCES_SUCCESS,
  VAULT_FETCH_USER_POOL_BALANCES_FAILURE,
} from './constants';
import { fetchPricePerFullShare, fetchAllowance } from '../../web3';
import async from 'async';

// FIXME: this function now getches all the information related to the pool, not only balances

export function fetchUserPoolBalances(data) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: VAULT_FETCH_USER_POOL_BALANCES_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // args.error here is only for test coverage purpose.
      const { address, web3, pools } = data;
      async.map(
        pools,
        (pool, callback) => {
          const earnContract = new web3.eth.Contract(vaultABI, pool.earnContractAddress);
          const erc20Contract = pool.tokenAddress
            ? new web3.eth.Contract(erc20ABI, pool.tokenAddress)
            : null;
          async.parallel(
            [
              callbackInner => {
                fetchAllowance({
                  web3,
                  contractAddress: pool.earnContractAddress,
                  contract: erc20Contract,
                  address,
                })
                  .then(data => {
                    return callbackInner(null, data);
                  })
                  .catch(error => {
                    return callbackInner(error, 0);
                  });
              },
              callbackInner => {
                fetchPricePerFullShare({
                  contract: earnContract,
                  address,
                })
                  .then(data => {
                    return callbackInner(null, data);
                  })
                  .catch(error => {
                    return callbackInner(error, 0);
                  });
              },
            ],
            (error, data) => {
              if (error) {
                console.log(error);
              }
              pool.allowance = data[0] || 0;
              pool.pricePerFullShare = data[1] || 1;
              callback(null, pool);
            }
          );
        },
        (error, pools) => {
          if (error) {
            dispatch({
              type: VAULT_FETCH_USER_POOL_BALANCES_FAILURE,
            });
            return reject(error.message || error);
          }
          dispatch({
            type: VAULT_FETCH_USER_POOL_BALANCES_SUCCESS,
            data: pools,
          });
          resolve();
        }
      );
    });

    return promise;
  };
}

export function useFetchUserPoolBalances() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { pools, fetchUserPoolBalancesPending } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchUserPoolBalancesPending: state.vault.fetchUserPoolBalancesPending,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchUserPoolBalances(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchUserPoolBalances: boundAction,
    fetchUserPoolBalancesPending,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_USER_POOL_BALANCES_BEGIN:
      return {
        ...state,
        fetchUserPoolBalancesPending: true,
      };

    case VAULT_FETCH_USER_POOL_BALANCES_SUCCESS:
      return {
        ...state,
        pools: action.data,
        fetchUserPoolBalancesPending: false,
      };

    case VAULT_FETCH_USER_POOL_BALANCES_FAILURE:
      return {
        ...state,
        fetchUserPoolBalancesPending: false,
      };

    default:
      return state;
  }
}
