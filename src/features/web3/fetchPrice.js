import axios from 'axios';
import BandChain from '@bandprotocol/bandchain.js';
import { pools } from '../configure/pools'

const endpoints = {
  bandchain: 'https://poa-api.bandchain.org',
  bakeryLp:  'https://api.beefy.finance/bakery/lps',
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
  jetfuelLp: 'https://api.beefy.finance/jetfuel/lps',
  narwhalLp: 'https://api.beefy.finance/narwhal/lps',
  pancake:   'https://api.beefy.finance/pancake/price',
  pancakeLp: 'https://api.beefy.finance/pancake/lps',
  thugsLp:   'https://api.beefy.finance/thugs/lps',
  thugs:     'https://api.beefy.finance/thugs/tickers',
};

const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
const WBNB_BUSD = `${WBNB}_${BUSD}`;

const CACHE_TIMEOUT = 30 * 60 * 1000;
const priceCache = {
  cache: new Map(),
  lastUpdated: undefined
}

function isCached(id) {
  return priceCache.cache.has(id)
  // return cache.get(id).t + CACHE_TIMEOUT > Date.now();
}

function getCachedPrice(id) {
  return priceCache.cache.get(id);
}

// Fetch prices from different sources
// Expected format: { id1: 100, id2: 200 }
const fetchBand = async ids => {
  try {
    const bandchain = new BandChain(endpoints.bandchain);
    const response = await bandchain.getReferenceData(ids);
    const prices = {}
    response.forEach(price => {
      prices[price.pair] = price.rate
    })
    return prices;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchCoingecko = async ids => {
  try {
    const response = await axios.get(endpoints.coingecko, {
      params: { ids: ids.join(','), vs_currencies: 'usd' },
    });
    const prices = {}
    for (let id in response.data) {
      prices[id] = response.data[id].usd
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
    return response.data.prices;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchThugs = async () => {
  try {
    const response = await axios.get(endpoints.thugs);
    const bnb = response.data[WBNB_BUSD]['last_price'];
    const prices = {}

    for (let pair in response.data) {
      const ticker = response.data[pair];

      let price = 0;
      if (pair === `${WBNB}_${BUSD}`) {
        price = bnb;
      } else if (pair.startsWith(`${WBNB}_`)) {
        price = bnb / ticker['last_price'];
      } else {
        price = bnb * ticker['last_price'];
      }

      prices[pair] = price
    }

    return prices;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const fetchLP = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (err) {
    console.error(err);
    return {};
  }
};

const oracleEndpoints = {
  'band': (ids) => fetchBand(ids),
  'bakery-lp': () => fetchLP(endpoints.bakeryLp),
  'coingecko': (ids) => fetchCoingecko(ids),
  'jetfuel-lp': () => fetchLP(endpoints.jetfuelLp),
  'narwhal-lp': () => fetchLP(endpoints.narwhalLp),
  'pancake': () => fetchPancake(),
  'pancake-lp': () => fetchLP(endpoints.pancakeLp),
  'thugs': () => fetchThugs(),
  'thugs-lp': () => fetchLP(endpoints.thugsLp)
}

export async function initializePriceCache () {
  const oracleToIds = new Map();
  pools.forEach(pool => {
    if (!oracleToIds.has(pool.oracle)) {
      oracleToIds.set(pool.oracle, []);
    }
    oracleToIds.get(pool.oracle).push(pool.oracleId);
  })

  const promises = [...oracleToIds.keys()].map(key => oracleEndpoints[key](oracleToIds.get(key)));
  const currentTimestamp = new Date()
  const results = await Promise.all(promises);
  const allPrices = results.reduce((accPrices, curPrices) => ({...accPrices, ...curPrices}), {});
  [...oracleToIds.values()].flat().forEach(id => priceCache.cache.set(id, allPrices[id]));
  priceCache.lastUpdated = currentTimestamp
}


export const fetchPrice = async ({ id }) => {
  if (id === undefined) {
    console.error('Undefined pair');
    return 0;
  }
  
  let counter = 0 // safe guard, though it shouldn't happen
  while (!isCached(id) && counter < 10) {
    console.trace(id, 'price not cached');
    counter++;
  }

  return getCachedPrice(id) ? getCachedPrice(id) : 0;
};
