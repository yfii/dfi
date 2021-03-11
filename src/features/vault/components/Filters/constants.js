import { pools } from '../../../configure/pools.js';

const unique = (key) => [...new Set(pools.map(pool => pool[key]).flat().filter(data => data !== undefined).sort())];
export const assets = unique('assets');
export const platforms = unique('platform');
export const stables = ['BUSD', 'USDT', 'USDC', 'DAI', 'VAI', 'QUSD', 'UST'];
