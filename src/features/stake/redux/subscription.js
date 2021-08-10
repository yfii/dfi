import { getNetworkMulticall, launchpools } from '../../helpers/getNetworkData';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { MooToken } from '../../configure/abi';
import { MultiCall } from 'eth-multicall';
import Web3 from 'web3';
import { getRpcUrl } from '../../../common/networkSetup';
import { useConnectWallet } from '../../home/redux/connectWallet';
import { byDecimals, ZERO } from '../../helpers/bignumber';
import { fetchPrice, whenPricesLoaded } from '../../web3';
import BigNumber from 'bignumber.js';
import { HOME_DISCONNECT_WALLET_BEGIN } from '../../home/redux/constants';
import { initialUserState } from './initialState';
import { updateLaunchpools } from '../../vault/redux/actions';

const DEFAULT_UPDATE_INTERVAL = 30000; // ms
const MIN_UPDATE_DELAY = 5000; // ms (min time between updates)
const ACTION_PREFIX = 'launchpools/subscription/';
const NOOP = () => {};

// what contact calls are needed to perform subscription actions
const subscriptionCalls = {
  userApproval: ['userApproval'],
  userBalance: ['userBalance'],
  userStaked: ['userStaked'],
  userRewardsAvailable: ['userRewardsAvailable'],
  poolApr: ['poolRewardRate', 'poolStaked', 'tokenPricePerShare'],
  poolStaked: ['poolStaked'],
  poolFinish: ['poolFinish'],
};

// list of contract calls that do not require the users wallet address
const callsDoNotNeedAddress = ['poolRewardRate', 'poolStaked', 'poolFinish', 'tokenPricePerShare'];

// list of subscriptions that do not require the users wallet address
const subscriptionsDoNotNeedAddress = Object.fromEntries(
  Object.entries(subscriptionCalls).map(([key, calls]) => [
    key,
    calls.every(call => callsDoNotNeedAddress.includes(call)),
  ])
);

// which contract is needed to perform the call
const callGroups = {
  userApproval: 'tokenAddress',
  userBalance: 'tokenAddress',
  userStaked: 'earnContractAddress',
  userRewardsAvailable: 'earnContractAddress',
  poolRewardRate: 'earnContractAddress',
  poolStaked: 'earnContractAddress',
  poolFinish: 'earnContractAddress',
  tokenPricePerShare: 'tokenAddress',
};

// contract name -> instance of the contract
const callGroupContracts = {
  tokenAddress: (web3, pool) => new web3.eth.Contract(MooToken, pool.tokenAddress),
  earnContractAddress: (web3, pool) =>
    new web3.eth.Contract(pool.earnContractAbi, pool.earnContractAddress),
};

// call name -> contract method call
const callFunctions = {
  userApproval: (tokenContract, pool, address) =>
    tokenContract.methods.allowance(address, pool.earnContractAddress),
  userBalance: (tokenContract, pool, address) => tokenContract.methods.balanceOf(address),
  userStaked: (earnContract, pool, address) => earnContract.methods.balanceOf(address),
  userRewardsAvailable: (earnContract, pool, address) => earnContract.methods.earned(address),
  poolRewardRate: (earnContract, pool, address) => earnContract.methods.rewardRate(),
  poolStaked: (earnContract, pool, address) => earnContract.methods.totalSupply(),
  poolFinish: (earnContract, pool, address) => earnContract.methods.periodFinish(),
  tokenPricePerShare: (tokenContract, pool, address) =>
    tokenContract.methods.getPricePerFullShare(),
};

// process subscription and dispatch action to update state
// data will include call results with keys defined in subscriptionCalls above
const subscriptionCallbacks = {
  userApproval: async (dispatch, pool, data) => {
    if (data.userApproval === undefined) {
      console.warn('Missing data for launchpools userApproval.');
      return;
    }

    // Save to state
    dispatch({
      type: ACTION_PREFIX + 'userApproval',
      payload: {
        id: pool.id,
        userApproval: data.userApproval,
      },
    });
  },
  userBalance: async (dispatch, pool, data) => {
    if (data.userBalance === undefined) {
      console.warn('Missing data for launchpools userBalance.');
      return;
    }

    // Save to state
    dispatch({
      type: ACTION_PREFIX + 'userBalance',
      payload: {
        id: pool.id,
        userBalance: data.userBalance,
      },
    });
  },
  userStaked: async (dispatch, pool, data) => {
    if (data.userStaked === undefined) {
      console.warn('Missing data for launchpools userStaked.');
      return;
    }

    // Save to state
    dispatch({
      type: ACTION_PREFIX + 'userStaked',
      payload: {
        id: pool.id,
        userStaked: data.userStaked,
      },
    });
  },
  userRewardsAvailable: async (dispatch, pool, data) => {
    if (data.userRewardsAvailable === undefined) {
      console.warn('Missing data for launchpools userRewardsAvailable.');
      return;
    }

    // Save to state
    dispatch({
      type: ACTION_PREFIX + 'userRewardsAvailable',
      payload: {
        id: pool.id,
        userRewardsAvailable: data.userRewardsAvailable,
      },
    });
  },
  poolStaked: async (dispatch, pool, data) => {
    if (data.poolStaked === undefined) {
      console.warn('Missing data for launchpools poolStaked.');
      return;
    }

    // Save to state
    dispatch({
      type: ACTION_PREFIX + 'poolStaked',
      payload: {
        id: pool.id,
        poolStaked: data.poolStaked,
      },
    });
  },
  poolApr: async (dispatch, pool, data) => {
    if (
      data.poolRewardRate === undefined ||
      data.poolStaked === undefined ||
      (pool.isMooStaked && data.tokenPricePerShare === undefined)
    ) {
      console.warn('Missing data for launchpools poolApr.');
      return;
    }

    await whenPricesLoaded();

    const rewardTokenPrice = fetchPrice({ id: pool.earnedOracleId });
    const rewardTokenDecimals = new BigNumber(10).exponentiatedBy(pool.earnedTokenDecimals);
    const rewardRate = new BigNumber(data.poolRewardRate);
    const rewardYearly = rewardRate.times(3600).times(24).times(365);
    const rewardYearlyUsd = rewardYearly.times(rewardTokenPrice).dividedBy(rewardTokenDecimals);

    const depositTokenDecimals = new BigNumber(10).exponentiatedBy(pool.tokenDecimals);
    const depositTokenStaked = new BigNumber(data.poolStaked);
    const depositTokenPrice = fetchPrice({ id: pool.tokenOracleId });
    let depositTokenStakedUsd = depositTokenStaked
      .times(depositTokenPrice)
      .dividedBy(depositTokenDecimals);

    if (pool.isMooStaked) {
      const pricePerShareDecimals = new BigNumber(10).exponentiatedBy(18);
      const pricePerShare = new BigNumber(data.tokenPricePerShare);

      depositTokenStakedUsd = depositTokenStakedUsd
        .times(pricePerShare)
        .dividedBy(pricePerShareDecimals);
    }

    const apr = rewardYearlyUsd.dividedBy(depositTokenStakedUsd).toNumber();

    // Save to state
    dispatch({
      type: ACTION_PREFIX + 'poolApr',
      payload: {
        id: pool.id,
        poolApr: apr,
      },
    });

    dispatch(updateLaunchpools);
  },
  poolFinish: async (dispatch, pool, data) => {
    if (data.poolFinish === undefined) {
      console.warn('Missing data for launchpools poolFinish.');
      return;
    }

    // Save to state
    dispatch({
      type: ACTION_PREFIX + 'poolFinish',
      payload: {
        id: pool.id,
        poolFinish: data.poolFinish,
      },
    });

    // Do not update fixed status pools
    if (pool.fixedStatus !== true) {
      // Calculate pool status based on initial status
      let poolStatus = pool.status;
      if (pool.status === 'active') {
        if (data.poolFinish === '0') {
          poolStatus = 'soon';
        } else if (data.poolFinish * 1000 < Date.now()) {
          poolStatus = 'closed';
        }
      } else if (pool.status === 'soon') {
        if (data.poolFinish * 1000 >= Date.now()) {
          poolStatus = 'active';
        }
      }

      dispatch({
        type: ACTION_PREFIX + 'poolStatus',
        payload: {
          id: pool.id,
          poolStatus,
        },
      });

      dispatch(updateLaunchpools);
    }
  },
};

// update state with subscription results
const subscriptionReducers = {
  subscribe: (state, payload) => {
    return {
      ...state,
      subscriptions: {
        ...state.subscriptions,
        [payload.id]: {
          ...state.subscriptions[payload.id],
          ...Object.fromEntries(
            payload.subscriptions.map(subscription => [
              subscription,
              (state.subscriptions[payload.id][subscription] || 0) + 1,
            ])
          ),
        },
      },
    };
  },
  unsubscribe: (state, payload) => {
    return {
      ...state,
      subscriptions: {
        ...state.subscriptions,
        [payload.id]: {
          ...state.subscriptions[payload.id],
          ...Object.fromEntries(
            payload.subscriptions.map(subscription => [
              subscription,
              (state.subscriptions[payload.id][subscription] || 0) - 1,
            ])
          ),
        },
      },
    };
  },
  userApproval: (state, payload) => {
    if (state.userApproval[payload.id] !== payload.userApproval) {
      return {
        ...state,
        userApproval: {
          ...state.userApproval,
          [payload.id]: payload.userApproval,
        },
      };
    }

    return state;
  },
  userBalance: (state, payload) => {
    if (state.userBalance[payload.id] !== payload.userBalance) {
      return {
        ...state,
        userBalance: {
          ...state.userBalance,
          [payload.id]: payload.userBalance,
        },
      };
    }

    return state;
  },
  userStaked: (state, payload) => {
    if (state.userStaked[payload.id] !== payload.userStaked) {
      return {
        ...state,
        userStaked: {
          ...state.userStaked,
          [payload.id]: payload.userStaked,
        },
      };
    }

    return state;
  },
  userRewardsAvailable: (state, payload) => {
    if (state.userRewardsAvailable[payload.id] !== payload.userRewardsAvailable) {
      return {
        ...state,
        userRewardsAvailable: {
          ...state.userRewardsAvailable,
          [payload.id]: payload.userRewardsAvailable,
        },
      };
    }

    return state;
  },
  poolFinish: (state, payload) => {
    if (state.poolFinish[payload.id] !== payload.poolFinish) {
      return {
        ...state,
        poolFinish: {
          ...state.poolFinish,
          [payload.id]: payload.poolFinish,
        },
      };
    }

    return state;
  },
  poolStatus: (state, payload) => {
    if (state.poolStatus[payload.id] !== payload.poolStatus) {
      return {
        ...state,
        poolStatus: {
          ...state.poolStatus,
          [payload.id]: payload.poolStatus,
        },
      };
    }

    return state;
  },
  poolStaked: (state, payload) => {
    if (state.poolStaked[payload.id] !== payload.poolStaked) {
      return {
        ...state,
        poolStaked: {
          ...state.poolStaked,
          [payload.id]: payload.poolStaked,
        },
      };
    }

    return state;
  },
  poolApr: (state, payload) => {
    if (state.poolApr[payload.id] !== payload.poolApr) {
      return {
        ...state,
        poolApr: {
          ...state.poolApr,
          [payload.id]: payload.poolApr,
        },
      };
    }

    return state;
  },
};

export function reducer(state, action) {
  if (action.type.substr(0, ACTION_PREFIX.length) === ACTION_PREFIX) {
    const key = action.type.substr(ACTION_PREFIX.length);
    if (key in subscriptionReducers) {
      return subscriptionReducers[key](state, action.payload);
    } else {
      console.error(`No reducer for launchpool action ${key}`);
    }
  } else if (action.type === HOME_DISCONNECT_WALLET_BEGIN) {
    // Clear user values on wallet disconnect
    return {
      ...state,
      ...initialUserState,
    };
  }

  return state;
}

// Exported so can be called on tx receipt (i.e. approval)
export async function updatePools(dispatch, getState) {
  const { home, stake } = getState();
  const { address: userAddress, web3: userWeb3 } = home;
  const { subscriptions } = stake;
  const hasAddress = userWeb3 && userAddress;
  const requestedCalls = {};

  // Get list of active subscriptions
  const activeSubscriptions = Object.fromEntries(
    Object.entries(subscriptions)
      .map(([poolId, poolSubscriptions]) => {
        const active = Object.entries(poolSubscriptions)
          .filter(([subscriptionKey, refCount]) => {
            return refCount > 0 && (hasAddress || subscriptionsDoNotNeedAddress[subscriptionKey]);
          })
          .map(([subscriptionKey]) => subscriptionKey);

        return active.length ? [poolId, active] : null;
      })
      .filter(entries => entries !== null)
  );

  // No active subscriptions?
  if (Object.keys(activeSubscriptions).length === 0) {
    // No RPC calls made, no need to throttle
    clearThrottleUpdatePools(dispatch);
    return;
  }

  // Gets list of contract calls required to fulfill active subscriptions
  for (const [poolId, poolSubscriptions] of Object.entries(activeSubscriptions)) {
    // For each subscription in the pool
    for (const subscriptionKey of poolSubscriptions) {
      // Add this poolId to the list of requested calls
      for (const callKey of subscriptionCalls[subscriptionKey]) {
        // Group by group > pool > calls
        const groupKey = callGroups[callKey];

        if (!(groupKey in requestedCalls)) {
          requestedCalls[groupKey] = {};
        }

        if (!(poolId in requestedCalls[groupKey])) {
          requestedCalls[groupKey][poolId] = new Set();
        }

        if (!requestedCalls[groupKey][poolId].has(callKey)) {
          requestedCalls[groupKey][poolId].add(callKey);
        }
      }
    }
  }

  // Get RPC connection
  const web3 = userWeb3 || new Web3(new Web3.providers.HttpProvider(getRpcUrl()));
  const multicall = new MultiCall(web3, getNetworkMulticall());

  // Build groups of calls for multicall
  const allCalls = Object.entries(requestedCalls).map(([groupKey, groupContracts]) => {
    return Object.entries(groupContracts).map(([poolId, callKeys]) => {
      const pool = launchpools[poolId];
      const contract = callGroupContracts[groupKey](web3, pool);
      const calls = Object.fromEntries(
        Array.from(callKeys).map(call => [call, callFunctions[call](contract, pool, userAddress)])
      );

      calls.poolId = poolId;

      return calls;
    });
  });

  // Call all, and collect results by poolId
  const allResults = await multicall.all(allCalls);
  const resultsById = {};
  for (const groupResults of allResults) {
    for (const result of groupResults) {
      const { poolId, ...rest } = result;
      if (!(poolId in resultsById)) {
        resultsById[poolId] = {};
      }
      resultsById[poolId] = { ...resultsById[poolId], ...rest };
    }
  }

  // Subscription callsbacks
  const callbacks = [];
  for (const [poolId, poolSubscriptions] of Object.entries(activeSubscriptions)) {
    // For each subscription in the pool
    for (const subscriptionKey of poolSubscriptions) {
      callbacks.push(
        subscriptionCallbacks[subscriptionKey](dispatch, launchpools[poolId], resultsById[poolId])
      );
    }
  }

  return Promise.allSettled(callbacks);
}

function createSubscribePool(poolId, data) {
  return {
    type: ACTION_PREFIX + 'subscribe',
    payload: {
      id: poolId,
      subscriptions: Object.entries(data)
        .filter(([, subscribe]) => subscribe)
        .map(([key]) => key),
    },
  };
}

function createUnsubscribePool(poolId, data) {
  return {
    type: ACTION_PREFIX + 'unsubscribe',
    payload: {
      id: poolId,
      subscriptions: Object.entries(data)
        .filter(([, subscribe]) => subscribe)
        .map(([key]) => key),
    },
  };
}

// waits until there is at least 100ms between update calls before actually calling update
// ensure maximum number of subscriptions are captured for the update
let debounceUpdatePoolsTimer = null;

async function debounceUpdatePools(dispatch) {
  if (debounceUpdatePoolsTimer) {
    clearTimeout(debounceUpdatePoolsTimer);
    debounceUpdatePoolsTimer = null;
  }

  debounceUpdatePoolsTimer = setTimeout(() => {
    debounceUpdatePoolsTimer = null;
    dispatch(throttleUpdatePools);
  }, 100);
}

// only allow update to be called at most every MIN_UPDATE_DELAY ms
// ensure RPC is not spammed with calls
let throttleUpdatePoolsLastUpdate = 0;
let throttleUpdatePoolsTimer = null;

async function throttleUpdatePools(dispatch) {
  const now = Date.now();
  const timeSinceLast = now - throttleUpdatePoolsLastUpdate;

  if (throttleUpdatePoolsTimer) {
    clearTimeout(throttleUpdatePoolsTimer);
    throttleUpdatePoolsTimer = null;
  }

  if (timeSinceLast >= MIN_UPDATE_DELAY) {
    throttleUpdatePoolsLastUpdate = now;
    dispatch(updatePools);
  } else {
    throttleUpdatePoolsTimer = setTimeout(() => {
      dispatch(throttleUpdatePools);
    }, MIN_UPDATE_DELAY - timeSinceLast);
  }
}

function clearThrottleUpdatePools(dispatch) {
  throttleUpdatePoolsLastUpdate = 0;

  if (throttleUpdatePoolsTimer) {
    dispatch(throttleUpdatePools);
  }
}

export function useLaunchpoolSubscriptions() {
  const dispatch = useDispatch();
  const update = useCallback(
    (immediate = false) => dispatch(immediate ? updatePools : debounceUpdatePools),
    [dispatch]
  );

  const unsubscribe = useCallback(
    (poolId, data) => dispatch(createUnsubscribePool(poolId, data)),
    [dispatch]
  );

  const subscribe = useCallback(
    (poolId, data) => {
      const action = createSubscribePool(poolId, data);

      // if we are subscribing to something
      if (action.payload.subscriptions.length) {
        // dispatch subscribe
        dispatch(action);
        // dispatch update
        update();
        // result is function that can undo the subscription
        return () => unsubscribe(poolId, data);
      }

      return NOOP;
    },
    [dispatch, update, unsubscribe]
  );

  return { subscribe, update };
}

export function useLaunchpoolUpdates(updateInterval = DEFAULT_UPDATE_INTERVAL) {
  const dispatch = useDispatch();
  const { update } = useLaunchpoolSubscriptions();
  const { web3, address } = useConnectWallet();

  // update on connect wallet
  useEffect(() => {
    if (web3 && address) {
      clearThrottleUpdatePools(dispatch);
      update();
    }
  }, [web3, address, dispatch, update]);

  // update on interval
  useEffect(() => {
    const id = setInterval(update, updateInterval);
    return () => clearInterval(id);
  }, [updateInterval, update]);
}

export function usePoolFinish(id) {
  return useSelector(state => (id ? state.stake.poolFinish[id] : null));
}

export function usePoolStatus(id) {
  return useSelector(state => (id ? state.stake.poolStatus[id] : null));
}

export function usePoolApr(id) {
  return useSelector(state => (id ? state.stake.poolApr[id] : null));
}

export function usePoolStaked(id) {
  const raw = useSelector(state => (id && id in launchpools ? state.stake.poolStaked[id] : null));

  return useMemo(() => {
    return raw ? byDecimals(raw, launchpools[id].tokenDecimals) : ZERO;
  }, [raw, id]);
}

export function useUserApproval(id) {
  const raw = useSelector(state => (id && id in launchpools ? state.stake.userApproval[id] : null));

  return useMemo(() => {
    return raw ? byDecimals(raw, launchpools[id].tokenDecimals) : ZERO;
  }, [raw, id]);
}

export function useUserBalance(id) {
  const raw = useSelector(state => (id && id in launchpools ? state.stake.userBalance[id] : null));

  return useMemo(() => {
    return raw ? byDecimals(raw, launchpools[id].tokenDecimals) : ZERO;
  }, [raw, id]);
}

export function useUserStaked(id) {
  const raw = useSelector(state => (id && id in launchpools ? state.stake.userStaked[id] : null));

  return useMemo(() => {
    return raw ? byDecimals(raw, launchpools[id].tokenDecimals) : ZERO;
  }, [raw, id]);
}

export function useUserRewardsAvailable(id) {
  const raw = useSelector(state =>
    id && id in launchpools ? state.stake.userRewardsAvailable[id] : null
  );

  return useMemo(() => {
    return raw ? byDecimals(raw, launchpools[id].earnedTokenDecimals) : ZERO;
  }, [raw, id]);
}
