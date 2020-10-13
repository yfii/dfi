import { byDecimals } from 'features/helpers/bignumber';

export const fetchTvl = async ({ contract }) => {
  const tvl = await contract.methods.balance().call();
  return byDecimals(tvl, 18).toNumber();
};
