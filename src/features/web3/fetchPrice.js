import axios from 'axios';

import { getNetworkPools } from '../helpers/getNetworkData';
import { staking } from '../configure';

const endpoints = {
  bakery: `https://api.beefy.finance/bakery/price?_=1615849468`,
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
  pancake: `https://api.beefy.finance/pancake/price?_=1615849468`,
  lps: `https://api.beefy.finance/lps?_=1615849468`,
};

const pools = getNetworkPools();

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

const fetchCoingecko = async ids => {
  try {
    const response = await axios.get(endpoints.coingecko, {
      params: { ids: ids.join(','), vs_currencies: 'usd' },
    });
    const prices = {};
    for (let id in response.data) {
      prices[id] = response.data[id].usd;
    }
    return prices;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchPancake = async () => {
  try {
    const response = await axios.get(endpoints.pancake);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchLP = async endpoint => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchBakery = async () => {
  try {
    const response = await axios.get(endpoints.bakery);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const oracleEndpoints = {
  bakery: () => fetchBakery(),
  coingecko: ids => fetchCoingecko(ids),
  pancake: () => fetchPancake(),
  lps: () => fetchLP(endpoints.lps),
};

export async function initializePriceCache() {
  const currentTimestamp = new Date();
  priceCache.lastUpdated = currentTimestamp;

  const oracleToIds = new Map();
  pools.forEach(pool => {
    if (!oracleToIds.has(pool.oracle)) {
      oracleToIds.set(pool.oracle, []);
    }
    oracleToIds.get(pool.oracle).push(pool.oracleId);
  });

  staking.forEach(pool => {
    if (!oracleToIds.has(pool.earnedOracle)) {
      oracleToIds.set(pool.earnedOracle, []);
    }
    oracleToIds.get(pool.earnedOracle).push(pool.earnedOracleId);
  });

  const promises = [...oracleToIds.keys()].map(key => oracleEndpoints[key](oracleToIds.get(key)));
  const results = await Promise.all(promises);
  const allPrices = results.reduce((accPrices, curPrices) => ({ ...accPrices, ...curPrices }), {});
  [...oracleToIds.values()].flat().forEach(id => priceCache.cache.set(id, allPrices[id]));
}

export const fetchPrice = async ({ id }) => {
  if (id === undefined) {
    console.error('Undefined pair');
    return 0;
  }

  let counter = 0; // safe guard, though it shouldn't happen
  while (!isCached(id) && counter < 10) {
    // console.trace(id, 'price not cached');
    counter++;
  }

  maybeUpdateCache();

  return getCachedPrice(id) ? getCachedPrice(id) : 0;
};
