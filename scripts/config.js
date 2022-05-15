import { bscPools } from '../src/features/configure/vault/bsc_pools.js';
import { hecoPools } from '../src/features/configure/vault/heco_pools.js';
import { avalanchePools } from '../src/features/configure/vault/avalanche_pools.js';
import { polygonPools } from '../src/features/configure/vault/polygon_pools.js';
import { fantomPools } from '../src/features/configure/vault/fantom_pools.js';
import { harmonyPools } from '../src/features/configure/vault/harmony_pools.js';
import { arbitrumPools } from '../src/features/configure/vault/arbitrum_pools.js';
import { celoPools } from '../src/features/configure/vault/celo_pools.js';
import { moonriverPools } from '../src/features/configure/vault/moonriver_pools.js';
import { cronosPools } from '../src/features/configure/vault/cronos_pools.js';
import { auroraPools } from '../src/features/configure/vault/aurora_pools.js';
import { fusePools } from '../src/features/configure/vault/fuse_pools.js';
import { metisPools } from '../src/features/configure/vault/metis_pools.js';
import { moonbeamPools } from '../src/features/configure/vault/moonbeam_pools.js';
import { emeraldPools } from '../src/features/configure/vault/emerald_pools.js';

export const chainPools = {
  bsc: bscPools,
  // heco: hecoPools,
  avax: avalanchePools,
  polygon: polygonPools,
  fantom: fantomPools,
  one: harmonyPools,
  arbitrum: arbitrumPools,
  celo: celoPools,
  moonriver: moonriverPools,
  cronos: cronosPools,
  aurora: auroraPools,
  fuse: fusePools,
  metis: metisPools,
  moonbeam: moonbeamPools,
  emerald: emeraldPools,
};

export const chainRpcs = {
  bsc: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org/',
  // heco: process.env.HECO_RPC || 'https://http-mainnet.hecochain.com',
  avax: process.env.AVAX_RPC || 'https://api.avax.network/ext/bc/C/rpc',
  polygon: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
  fantom: process.env.FANTOM_RPC || 'https://rpc.ftm.tools/',
  one: process.env.HARMONY_RPC || 'https://api.harmony.one/',
  arbitrum: process.env.ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
  celo: process.env.CELO_RPC || 'https://forno.celo.org',
  moonriver: process.env.MOONRIVER_RPC || 'https://moonriver.api.onfinality.io/public',
  cronos: process.env.CRONOS_RPC || 'https://evm.cronos.org',
  aurora: process.env.AURORA_RPC || 'https://mainnet.aurora.dev/',
  fuse: process.env.FUSE_RPC || 'https://rpc.fuse.io',
  metis: process.env.METIS_RPC || 'https://andromeda.metis.io/?owner=1088',
  moonbeam: process.env.MOONBEAM_RPC || 'https://rpc.api.moonbeam.network',
  emerald: process.env.EMERALD_RPC || 'https://emerald.oasis.dev',
};
