import { bscPools, hecoPools } from '../configure';

export const getNetworkPools = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '128':
      return hecoPools;
    case '56':
      return bscPools;
    default:
      return [];
  }
};

export const getNetworkStables = () => {
  switch (process.env.REACT_APP_NETWORK_ID) {
    case '56':
      return ['BUSD', 'USDT', 'USDC', 'DAI', 'VAI', 'QUSD'];
    case '128':
      return ['USDT', 'HUSD'];
    default:
      return [];
  }
};
