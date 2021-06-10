import axios from 'axios';

import { getNetworkPools, getNetworkStakePools } from '../helpers/getNetworkData';
import { getApiCacheBuster } from './getApiCacheBuster';

const pools = getNetworkPools();
const stakePools = getNetworkStakePools();

const CACHE_TIMEOUT_MS = 1 * 60 * 1000; // 1 minute(s)
const priceCache = {
  cache: new Map(),
  lastUpdated: undefined,
};

function isCached(id) {
  return priceCache.cache.has(id);
}

function getCachedPrice(id) {
  return priceCache.cache.get(id);
}

function maybeUpdateCache() {
  const currentTimestamp = new Date();
  if (
    priceCache.lastUpdated &&
    currentTimestamp.getTime() > priceCache.lastUpdated.getTime() + CACHE_TIMEOUT_MS
  ) {
    initializePriceCache();
    // console.trace('price cache updated')
  }
}

const fetchTokens = async () => {
  const cacheBuster = getApiCacheBuster();

  try {
    const response = await axios.get(`https://api.beefy.finance/prices?_=${cacheBuster}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchLPs = async () => {
  const cacheBuster = getApiCacheBuster();

  try {
    const response = await axios.get(`https://api.beefy.finance/lps?_=${cacheBuster}`);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const oracleEndpoints = {
  tokens: () => fetchTokens(),
  lps: () => fetchLPs(),
};

let pricesLoadedPromise;
export function whenPricesLoaded() {
  return pricesLoadedPromise;
}

export function initializePriceCache() {
  const currentTimestamp = new Date();
  priceCache.lastUpdated = currentTimestamp;

  const oracleToIds = new Map();
  pools.forEach(pool => {
    if (!oracleToIds.has(pool.oracle)) {
      oracleToIds.set(pool.oracle, []);
    }
    oracleToIds.get(pool.oracle).push(pool.oracleId);
  });

  // BIFI should always be fetched
  if (!oracleToIds.has('tokens')) {
    oracleToIds.set('tokens', []);
  }
  oracleToIds.get('tokens').push('BIFI');

  stakePools.forEach(pool => {
    if (!oracleToIds.has(pool.earnedOracle)) {
      oracleToIds.set(pool.earnedOracle, []);
    }
    oracleToIds.get(pool.earnedOracle).push(pool.earnedOracleId);
  });

  const promises = [...oracleToIds.keys()].map(key => oracleEndpoints[key](oracleToIds.get(key)));
  pricesLoadedPromise = Promise.all(promises).then(results => {
    const allPrices = results.reduce(
      (accPrices, curPrices) => ({ ...accPrices, ...curPrices }),
      {}
    );
    [...oracleToIds.values()].flat().forEach(id => priceCache.cache.set(id, allPrices[id]));
  });
}

export const fetchPrice = ({ id }) => {
  if (id === undefined) {
    console.error('Undefined pair');
    return 0;
  }

  maybeUpdateCache();

  return getCachedPrice(id) || 0;
};
