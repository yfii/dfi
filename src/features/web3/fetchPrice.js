const BandChain = require('@bandprotocol/bandchain.js');

const endpoints = {
  bandchain: 'https://poa-api.bandchain.org',
  pancake:   'https://api.pancakeswap.finance/api/v1/price',
};

const fetchBand = async (id) => {
  const bandchain = new BandChain(endpoints.bandchain);
  try {
    const price = await bandchain.getReferenceData([id]);
    return price[0].rate;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const fetchPancake = async (id) => {
  // TODO: implement this
  return 0;
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
