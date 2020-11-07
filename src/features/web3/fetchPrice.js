import axios from 'axios';
import BandChain from '@bandprotocol/bandchain.js';

const endpoints = {
  bandchain: 'https://poa-api.bandchain.org',
  pancake:   'https://beefy-api.herokuapp.com/pancake/price',
  pancakeLp: 'https://beefy-api.herokuapp.com/pancake/lps',
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
};

const fetchBand = async (id) => {
  try {
    // TODO: add client-side cache
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
    // TODO: add client-side cache 
    const response = await axios.get(endpoints.pancake);
    return response.data.prices[id];
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchPancakeLP = async (id) => {
  try {
    // TODO: add client-side cache
    const response = await axios.get(endpoints.pancakeLp);
    return response.data.prices[id];
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

export const fetchPrice = async ({ oracle, id }) => {
  if (oracle === undefined) { console.error('Undefined oracle'); return 0; }
  if (id === undefined) { console.error('Undefined pair'); return 0; }

  switch(oracle) {
    case 'band':       return await fetchBand(id);
    case 'pancake':    return await fetchPancake(id);
    case 'pancake-lp': return await fetchPancakeLP(id);
    case 'coingecko':  return await fetchCoingecko(id);
    default: console.error('Unknown oracle:', oracle);
  }
};
