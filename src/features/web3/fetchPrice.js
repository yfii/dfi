import axios from 'axios';
import BandChain from '@bandprotocol/bandchain.js';

const endpoints = {
  bandchain: 'https://poa-api.bandchain.org',
  pancake:   'https://beefy-api.herokuapp.com/proxy/pancake',
  coingecko: 'https://api.coingecko.com/api/v3/simple/price',
};

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

export const fetchPrice = async ({ oracle, id }) => {
  if (oracle === undefined) { console.error('Undefined oracle'); return 0; }
  if (id === undefined) { console.error('Undefined pair'); return 0; }

  switch(oracle) {
    case 'Band':    return await fetchBand(id);
    case 'Pancake': return await fetchPancake(id);
    default: console.error('Unknown oracle:', oracle);
  }
};
