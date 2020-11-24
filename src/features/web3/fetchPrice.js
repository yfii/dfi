import axios from 'axios';
import BandChain from '@bandprotocol/bandchain.js';

const endpoints = {
  bandchain: 'https://poa-api.bandchain.org',
  pancake:   'https://beefy-api.herokuapp.com/pancake/price',
  pancakeLp: 'https://beefy-api.herokuapp.com/pancake/lps',
  thugsLp:   'https://beefy-api.herokuapp.com/thugs/lps',
  thugs:     'https://beefy-api.herokuapp.com/thugs/tickers',
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
};

const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const WBNB_BUSD = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c_0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';

const CACHE_TIMEOUT = 30 * 60 * 1000;
const cache = {};

function isCached({oracle, id}) {
  if (`${oracle}-${id}` in cache) {
    return cache[`${oracle}-${id}`].t + CACHE_TIMEOUT > Date.now();
  }
  return false;
}

function getCachedPrice({oracle, id}) {
  return cache[`${oracle}-${id}`].price;
}

function addToCache({oracle, id, price}) {
  cache[`${oracle}-${id}`] = {price: price, t: Date.now()};
}

const fetchBand = async (id) => {
  try {
    const bandchain = new BandChain(endpoints.bandchain);
    const price = await bandchain.getReferenceData([id]);
    return price[0].rate;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchPancake = async (id) => {
  try {
    const response = await axios.get(endpoints.pancake);
    return response.data.prices[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchPancakeLP = async (id) => {
  try {
    const response = await axios.get(endpoints.pancakeLp);
    return response.data[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchThugsLP = async (id) => {
  try {
    const response = await axios.get(endpoints.thugsLp);
    return response.data[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchCoingecko = async (id) => {
  try {
    const response = await axios.get(endpoints.coingecko, {
      params: {ids: id, vs_currencies: 'usd' }
    });
    return response.data[id].usd;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchThugs = async (id) => {
  try {
    const response = await axios.get(endpoints.thugs);
    const ticker = response.data[id];
    const bnb = response.data[WBNB_BUSD]['last_price'];

    let price = 0;

    const pair = id.split('_');
    if(pair[0] === WBNB) {
      price = bnb / ticker['last_price'];
    } else {
      price = bnb * ticker['last_price'];
    }
    
    return price;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const fetchPrice = async ({ oracle, id }) => {
  if (oracle === undefined) { console.error('Undefined oracle'); return 0; }
  if (id === undefined) { console.error('Undefined pair'); return 0; }

  if (isCached({oracle, id})){
    return getCachedPrice({oracle, id});
  }

  let price;
  switch(oracle) {
    case 'band':       price = await fetchBand(id); break;
    case 'pancake':    price = await fetchPancake(id); break;
    case 'pancake-lp': price = await fetchPancakeLP(id); break;
    case 'thugs-lp':   price = await fetchThugsLP(id); break;
    case 'coingecko':  price = await fetchCoingecko(id); break;
    case 'thugs':      price = await fetchThugs(id); break;
    default: price = 0;
  }
  
  addToCache({oracle, id, price});
  return price;
};
