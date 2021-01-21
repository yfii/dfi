import async from 'async';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import {
  STAKE_FETCH_POOLS_INFO_BEGIN,
  STAKE_FETCH_POOLS_INFO_SUCCESS,
  STAKE_FETCH_POOLS_INFO_FAILURE,
} from './constants';

const _getStakedBalance = async (web3, asset, account, callback) => {
  let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);

  try {
    var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
    balance = parseFloat(balance) / 10 ** asset.decimals;
    callback(null, parseFloat(balance));
  } catch (ex) {
    return callback(ex);
  }
};

const _getTotalValueLocked = async (web3, asset, account, callback) => {
  let lpTokenContract = new web3.eth.Contract(asset.abi, asset.address);

  try {
    let tvl = await lpTokenContract.methods.balanceOf(asset.rewardsAddress).call({ from: account.address });
    tvl = parseFloat(tvl) / 10 ** asset.decimals;
    callback(null, parseFloat(tvl));
  } catch (ex) {
    return callback(ex);
  }
};

export function fetchPoolsInfo(data) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: STAKE_FETCH_POOLS_INFO_BEGIN });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      const { web3, address, pools } = data;

      async.map(
        pools,
        (pool, callback) => {
          async.parallel(
            [
              callbackInner => {
                _getStakedBalance(web3, pool, { address }, callbackInner);
              },
              callbackInner => {
                _getTotalValueLocked(web3, pool, { address }, callbackInner);
              },
            ],
            (error, data) => {
              if (error) {
                console.log(error);
              }
              pool.staked = data[0] || 0;
              pool.tvl = data[1] || 0;
              callback(null, pool);
            }
          );
        },
        (error, pools) => {
          if (error) {
            dispatch({
              type: STAKE_FETCH_POOLS_INFO_FAILURE,
            });
            return reject(error.message || error);
          }
          dispatch({
            type: STAKE_FETCH_POOLS_INFO_SUCCESS,
            data: pools,
          });
          resolve();
        }
      );
    });

    return promise;
  };
}

export function useFetchPoolsInfo() {
  // args: false value or array
  // if array, means args passed to the action creator
  const dispatch = useDispatch();

  const { pools, poolsInfo, fetchPoolsInfoPending } = useSelector(
    state => ({
      pools: state.stake.pools,
      poolsInfo: state.stake.poolsInfo,
      fetchPoolsInfoPending: state.stake.fetchPoolsInfoPending,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(data => dispatch(fetchPoolsInfo(data)), [dispatch]);

  return {
    fetchPoolsInfo: boundAction,
    pools,
    poolsInfo,
    fetchPoolsInfoPending
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case STAKE_FETCH_POOLS_INFO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPoolsInfoPending: true
      };

    case STAKE_FETCH_POOLS_INFO_SUCCESS:
      // The request is success
      return {
        ...state,
        poolsInfo: action.data,
        fetchPoolsInfoPending: false
      };

    case STAKE_FETCH_POOLS_INFO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPoolsInfoPending: false
      };

    default:
      return state;
  }
}
