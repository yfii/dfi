// To run: yarn validate
import { isValidChecksumAddress, maybeChecksumAddress } from './utils.js';
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

const addressFields = ['tokenAddress', 'earnedTokenAddress', 'earnContractAddress'];

const allowedEarnSameToken = new Set(['venus-wbnb']);

// Outputs alphabetical list of platforms per chain (useful to make sure they are consistently named)
const outputPlatformSummary = process.argv.includes('--platform-summary');

let exitCode = 0;

for (const [chain, pools] of Object.entries(chainPools)) {
  console.log(`Validating ${pools.length} pools in ${chain}...`);

  const uniquePoolId = new Set();
  const uniqueEarnedToken = new Set();
  const uniqueEarnedTokenAddress = new Set();
  const uniqueOracleId = new Set();
  const platformCounts = {};
  let activePools = 0;

  pools.forEach(pool => {
    // Errors, should not proceed with build
    if (uniquePoolId.has(pool.id)) {
      console.error(`Error: ${pool.id} : Pool id duplicated: ${pool.id}`);
      exitCode = 1;
    }

    if (uniqueEarnedToken.has(pool.earnedToken) && !allowedEarnSameToken.has(pool.id)) {
      console.error(`Error: ${pool.id} : Pool earnedToken duplicated: ${pool.earnedToken}`);
      exitCode = 1;
    }

    if (
      uniqueEarnedTokenAddress.has(pool.earnedTokenAddress) &&
      !allowedEarnSameToken.has(pool.id)
    ) {
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

    if (!pool.tokenDescription) {
      console.error(
        `Error: ${pool.id} : Pool tokenDescription missing - required for UI: vault card`
      );
      exitCode = 1;
    }

    if (!pool.platform) {
      console.error(
        `Error: ${pool.id} : Pool platform missing - required for UI: filter (Use 'Other' if necessary)`
      );
      exitCode = 1;
    } else {
      platformCounts[pool.platform] = platformCounts.hasOwnProperty(pool.platform)
        ? platformCounts[pool.platform] + 1
        : 1;
    }

    addressFields.forEach(field => {
      if (pool.hasOwnProperty(field) && !isValidChecksumAddress(pool[field])) {
        const maybeValid = maybeChecksumAddress(pool[field]);
        console.error(
          `Error: ${pool.id} : ${field} requires checksum - ${
            maybeValid ? `\n\t${field}: '${maybeValid}',` : 'it is invalid'
          }`
        );
        exitCode = 1;
      }
    });

    if (pool.status === 'active') {
      activePools++;
    }

    uniquePoolId.add(pool.id);
    uniqueEarnedToken.add(pool.earnedToken);
    uniqueEarnedTokenAddress.add(pool.earnedTokenAddress);
    uniqueOracleId.add(pool.oracleId);
  });

  if (outputPlatformSummary) {
    console.log(
      `Platforms: \n${Object.entries(platformCounts)
        .sort(([platformA], [platformB]) =>
          platformA.localeCompare(platformB, 'en', { sensitivity: 'base' })
        )
        .map(([platform, count]) => `\t${platform} (${count})`)
        .join('\n')}`
    );
  }

  console.log(`Active pools: ${activePools}/${pools.length}\n`);
}

process.exit(exitCode);
