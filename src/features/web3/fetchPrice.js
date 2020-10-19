const BandChain = require('@bandprotocol/bandchain.js');

const endpoint = 'https://poa-api.bandchain.org';
const bandchain = new BandChain(endpoint);

export const fetchPrice = async ({ oracle, pair }) => {
  if (pair === undefined) {
    return 0;
  }
  try {
    const price = await bandchain.getReferenceData([pair]);
    return price[0].rate;
  } catch (err) {
    console.error(err);
    return 0;
  }
};


// const getPrice = async id => {
//   const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
//     params: {
//       ids: id,
//       vs_currencies: 'usd',
//     },
//   });
//   return response.data[id].usd;
// };