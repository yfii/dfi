const BandChain = require('@bandprotocol/bandchain.js');

const endpoint = 'https://poa-api.bandchain.org';
const bandchain = new BandChain(endpoint);

export const fetchPrice = async ({ pair }) => {
  if (pair === undefined) { return 0; }
  try {
    const price = await bandchain.getReferenceData([pair]);
    return price[0].rate;

  } catch (err) {
    console.error(err);
    return 0;
  }
};
