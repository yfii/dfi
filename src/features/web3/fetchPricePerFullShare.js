import { byDecimals } from 'features/helpers/bignumber';

export const fetchPricePerFullShare = async ({ address, contract }) => {
  const pricePerFullShare = await contract.methods.getPricePerFullShare().call({ from: address });
  return byDecimals(pricePerFullShare, 18).toNumber();
};
