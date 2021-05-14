// To run: yarn validate

import { bscPools } from '../src/features/configure/vault/bsc_pools.js';
import { hecoPools } from '../src/features/configure/vault/heco_pools.js';
import { avalanchePools } from '../src/features/configure/vault/avalanche_pools.js';
import { polygonPools } from '../src/features/configure/vault/polygon_pools.js';
import { fantomPools } from '../src/features/configure/vault/fantom_pools.js';

const chainPools = {
  bscPools,
  hecoPools,
  avalanchePools,
  polygonPools,
  fantomPools,
};

let exitCode = 0;

for (const [chain, pools] of Object.entries(chainPools)) {
  console.log(`Validating ${pools.length} pools in ${chain}...`);

  let uniquePoolId = new Set();
  let uniqueEarnedToken = new Set();
  let uniqueEarnedTokenAddress = new Set();
  let uniqueOracleId = new Set();
  let activePools = 0;

  pools.forEach(pool => {
    // Errors, should not proceed with build
    if (uniquePoolId.has(pool.id)) {
      console.error(`Error: ${pool.id} : Pool id duplicated: ${pool.id}`);
      exitCode = 1;
    }

    if (uniqueEarnedToken.has(pool.earnedToken)) {
      if (pool.id === 'venus-wbnb') return; // Special case, supposed to be same as venus-bnb
      console.error(
        `Error: ${pool.id} : Pool earnedToken duplicated: ${pool.earnedToken}`
      );
      exitCode = 1;
    }

    if (uniqueEarnedTokenAddress.has(pool.earnedTokenAddress)) {
      if (pool.id === 'venus-wbnb') return; // Special case, supposed to be same as venus-bnb
      console.error(
        `Error: ${pool.id} : Pool earnedTokenAddress duplicated: ${pool.earnedTokenAddress}`
      );
      exitCode = 1;
    }

    if (pool.earnedTokenAddress !== pool.earnContractAddress) {
      console.error(
        `Error: ${pool.id} : Pool earnedTokenAddress not same as earnContractAddress: ${pool.earnedTokenAddress} != ${pool.earnContractAddress}`
      );
      exitCode = 1;
    }

    if (pool.status === 'active') {
      activePools++;
    }

    uniquePoolId.add(pool.id);
    uniqueEarnedToken.add(pool.earnedToken);
    uniqueEarnedTokenAddress.add(pool.earnedTokenAddress);
    uniqueOracleId.add(pool.oracleId);
  });

  console.log(`Active pools: ${activePools}/${pools.length}`);

};

process.exit(exitCode)
