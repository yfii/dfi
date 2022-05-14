/* eslint-disable import/first */
export const allNetworks = [
  {
    name: 'BSC',
    asset: 'BSC',
    id: 56,
    hash: '/bsc',
  },
  {
    name: 'HECO',
    asset: 'HECO',
    id: 128,
    hash: '/heco',
  },
  {
    name: 'AVALANCHE',
    asset: 'AVALANCHE',
    id: 43114,
    hash: '/avax',
  },
  {
    name: 'POLYGON',
    asset: 'POLYGON',
    id: 137,
    hash: '/polygon',
  },
  {
    name: 'FANTOM',
    asset: 'FANTOM',
    id: 250,
    hash: '/fantom',
  },
  {
    name: 'HARMONY',
    asset: 'HARMONY',
    id: 1666600000,
    hash: '/harmony',
  },
  {
    name: 'ARBITRUM',
    asset: 'ARBITRUM',
    id: 42161,
    hash: '/arbitrum',
  },
  {
    name: 'CELO',
    asset: 'CELO',
    id: 42220,
    hash: '/celo',
  },
  {
    name: 'MOONRIVER',
    asset: 'MOONRIVER',
    id: 1285,
    hash: '/moonriver',
  },
  {
    name: 'CRONOS',
    asset: 'CRONOS',
    id: 25,
    hash: '/cronos',
  },
  {
    name: 'FUSE',
    asset: 'FUSE Network',
    id: 122,
    hash: '/fuse',
  },
  {
    name: 'METIS',
    asset: 'Andromeda',
    id: 1088,
    hash: '/metis',
  },
  {
    name: 'AURORA',
    asset: 'AURORA',
    id: 1313161554,
    hash: '/aurora',
  },
  {
    name: 'MOONBEAM',
    asset: 'MOONBEAM',
    id: 1284,
    hash: '/moonbeam',
  },
  {
    name: 'OASIS',
    asset: 'EMERALD',
    id: 42262,
    hash: '/oasis',
  },
];

const network = allNetworks.find(n => window.location.hash.startsWith('#' + n.hash));

if (!network) {
  window.location.hash = allNetworks[0].hash;
  window.location.reload();
} else {
  window.REACT_APP_NETWORK_ID = network.id;
}

export default network;
