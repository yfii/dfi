import { getNetworkPools, getNetworkStables } from '../../../helpers/getNetworkData';

const unique = key => [
  ...new Set(
    getNetworkPools()
      .map(pool => pool[key])
      .flat()
      .filter(data => data !== undefined)
      .sort()
  ),
];

export const assets = unique('assets');
export const platforms = unique('platform');
export const stables = getNetworkStables();
