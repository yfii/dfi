import async from 'async';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

// import { erc20ABI } from '../../configure/abi';

import {
  STAKE_FETCH_POOLS_INFO_BEGIN,
  STAKE_FETCH_POOLS_INFO_SUCCESS,
  STAKE_FETCH_POOLS_INFO_FAILURE,
} from './constants';

// const _getERC20Balance = async (web3, asset, account, callback) => {
//   let erc20Contract = new web3.eth.Contract(erc20ABI, asset.address);
//
//   try {
//     var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
//     balance = parseFloat(balance) / 10 ** asset.decimals;
//     callback(null, parseFloat(balance));
//   } catch (ex) {
//     return callback(ex);
//   }
// };
//
// const _getStakedBalance = async (web3, asset, account, callback) => {
//   let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);
//
//   try {
//     var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
//     balance = parseFloat(balance) / 10 ** asset.decimals;
//     callback(null, parseFloat(balance));
//   } catch (ex) {
//     return callback(ex);
//   }
// };
//
// const _getRewardsAvailable = async (web3, asset, account, callback) => {
//   let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);
//
//   try {
//     var earned = await erc20Contract.methods.earned(account.address).call({ from: account.address });
//     earned = parseFloat(earned) / 10 ** asset.decimals;
//     callback(null, parseFloat(earned));
//   } catch (ex) {
//     return callback(ex);
//   }
// };
//
// const _getTotalValueLocked = async (web3, asset, account, callback) => {
//   let lpTokenContract = new web3.eth.Contract(asset.abi, asset.address);
//
//   try {
//     let tvl = await lpTokenContract.methods.balanceOf(asset.rewardsAddress).call({ from: account.address });
//     tvl = parseFloat(tvl) / 10 ** asset.decimals;
//     callback(null, parseFloat(tvl));
//   } catch (ex) {
//     return callback(ex);
//   }
// };
//
// const _getRewardRate = async (web3, asset, account, callback) => {
//   let rewardsPoolContract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress);
//   try {
//     let rewardRate = await rewardsPoolContract.methods.rewardRate().call({ from: account.address });
//     rewardRate = parseFloat(rewardRate) / 10 ** asset.decimals;
//     callback(null, parseFloat(rewardRate));
//   } catch (ex) {
//     return callback(ex);
//   }
// };

export function fetchPoolsInfo(data) {
  return (dispatch, getState) => {
    // optionally you can have getState as the second argument
    dispatch({ type: STAKE_FETCH_POOLS_INFO_BEGIN });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // const { web3, address, pools } = data;
      const { pools } = data;

      async.map(
        pools,
        (pool, callback) => {
          async.parallel(
            [
              callbackInner => {
                // _getERC20Balance(web3, pool, { address }, callbackInner);
              },
              callbackInner => {
                // _getStakedBalance(web3, pool, { address }, callbackInner);
              },
              callbackInner => {
                // _getRewardsAvailable(web3, pool, { address }, callbackInner);
              },
              callbackInner => {
                // _getTotalValueLocked(web3, pool, { address }, callbackInner);
              },
              callbackInner => {
                // _getRewardRate(web3, pool, { address }, callbackInner);
              },
            ],
            (error, data) => {
              if (error) {
                console.log(error);
              }
              pool.balance = data[0] || 0;
              pool.stakedBalance = data[1] || 0;
              pool.rewardsAvailable = data[2] || 0;
              pool.tvl = data[3] || 0;
              pool.rewardRate = data[4] || 0;
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
