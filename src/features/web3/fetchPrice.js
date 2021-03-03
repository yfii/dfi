import axios from 'axios';
import { pools } from '../configure/pools';

const endpoints = {
  bakery: 'https://api.beefy.finance/bakery/price?_=1614803021',
  bakeryLp: 'https://api.beefy.finance/bakery/lps?_=1614803021',
  bdollarLp: 'https://api.beefy.finance/bdollar/lps?_=1614803021',
  boltLp: 'https://api.beefy.finance/bolt/lps?_=1614803021',
  cafeLp: 'https://api.beefy.finance/cafe/lps?_=1614803021',
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
  jetfuelLp: 'https://api.beefy.finance/jetfuel/lps?_=1614803021',
  kebabLp: 'https://api.beefy.finance/kebab/lps?_=1614803021',
  monsterLp: 'https://api.beefy.finance/monster/lps?_=1614803021',
  narwhalLp: 'https://api.beefy.finance/narwhal/lps?_=1614803021',
  nyanswopLp: 'https://api.beefy.finance/nyanswop/lps?_=1614803021',
  pancake: 'https://api.beefy.finance/pancake/price?_=1614803021',
  pancakeLp: 'https://api.beefy.finance/pancake/lps?_=1614803021',
  ramenLp: 'https://api.beefy.finance/ramen/lps?_=1614803021',
  thugs: 'https://api.beefy.finance/thugs/tickers?_=1614803021',
  thugsLp: 'https://api.beefy.finance/thugs/lps?_=1614803021',
  spongeLp:   'https://api.beefy.finance/sponge/lps?_=1614803021',
  crowLp: 'https://api.beefy.finance/crow/lps?_=1614803021',
  lps: 'https://api.beefy.finance/lps?_=1614803021',
};

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
  'bakery-lp': () => fetchLP(endpoints.bakeryLp),
  bakery: () => fetchBakery(),
  'bdollar-lp': () => fetchLP(endpoints.bdollarLp),
  coingecko: ids => fetchCoingecko(ids),
  'jetfuel-lp': () => fetchLP(endpoints.jetfuelLp),
  'monster-lp': () => fetchLP(endpoints.monsterLp),
  'narwhal-lp': () => fetchLP(endpoints.narwhalLp),
  'nyanswop-lp': () => fetchLP(endpoints.nyanswopLp),
  pancake: () => fetchPancake(),
  'pancake-lp': () => fetchLP(endpoints.pancakeLp),
  'thugs-lp': () => fetchLP(endpoints.thugsLp),
  'kebab-lp': () => fetchLP(endpoints.kebabLp),
  'sponge-lp': () => fetchLP(endpoints.spongeLp),
  'bolt-lp': () => fetchLP(endpoints.boltLp),
  'cafe-lp': () => fetchLP(endpoints.cafeLp),
  'ramen-lp': () => fetchLP(endpoints.ramenLp),
  'crow-lp': () => fetchLP(endpoints.crowLp),
  'lps': () => fetchLP(endpoints.lps),
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
