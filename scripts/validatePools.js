// To run: yarn validate
import { MultiCall } from 'eth-multicall';
import { addressBook } from 'blockchain-addressbook';
import Web3 from 'web3';

import { isEmpty } from '../src/features/helpers/utils.js';
import { isValidChecksumAddress, maybeChecksumAddress } from './utils.js';
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
import { vaultABI, strategyABI } from '../src/features/configure/abi.js';

const chainPools = {
  bsc: bscPools,
  heco: hecoPools,
  avax: avalanchePools,
  polygon: polygonPools,
  fantom: fantomPools,
  one: harmonyPools,
  arbitrum: arbitrumPools,
  celo: celoPools,
  moonriver: moonriverPools,
  cronos: cronosPools,
};

const chainRpcs = {
  bsc: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org/',
  heco: process.env.HECO_RPC || 'https://http-mainnet.hecochain.com',
  avax: process.env.AVAX_RPC || 'https://api.avax.network/ext/bc/C/rpc',
  polygon: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
  fantom: process.env.FANTOM_RPC || 'https://rpc.ftm.tools/',
  one: process.env.HARMONY_RPC || 'https://api.s0.t.hmny.io/',
  arbitrum: process.env.ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
  celo: process.env.CELO_RPC || 'https://forno.celo.org',
  moonriver: process.env.MOONRIVER_RPC || 'https://rpc.moonriver.moonbeam.network',
  cronos: process.env.CRONOS_RPC || 'https://evm-cronos.crypto.org',
};

const overrides = {
  'bunny-bunny-eol': { keeper: undefined, stratOwner: undefined },
  'blizzard-xblzd-bnb-old-eol': { keeper: undefined },
  'blizzard-xblzd-busd-old-eol': { keeper: undefined },
  'heco-bifi-maxi': { beefyFeeRecipient: undefined }, // 0x0
  'bifi-maxi': { stratOwner: undefined }, // harvester 0xDe30
  'beltv2-4belt': { vaultOwner: undefined }, // moonpot deployer
};

const oldValidOwners = [
  addressBook.fantom.platforms.beefyfinance.devMultisig,
  addressBook.polygon.platforms.beefyfinance.devMultisig,
  // '0xd529b1894491a0a26B18939274ae8ede93E81dbA', // admin eoa
  // '0xC362FA359031A081D21Cb9d57c29e055FecbcB06', // admin eoa
  // '0x6d28afD25a1FBC5409B1BeFFf6AEfEEe2902D89F', // strat timelock owner
  // '0x4E2a43a0Bf6480ee8359b7eAE244A9fBe9862Cdf', // vault owner
  // '0x09dc95959978800E57464E962724a34Bb4Ac1253', // polygon dev multisig
];

const oldValidFeeRecipients = {
  fantom: ['0x4f8865A1FcE2877cCB55264600D4759d222E8fEB'],
};

const validatePools = async () => {
  const addressFields = ['tokenAddress', 'earnedTokenAddress', 'earnContractAddress'];

  const allowedEarnSameToken = new Set(['venus-wbnb']);

  // Outputs alphabetical list of platforms per chain (useful to make sure they are consistently named)
  const outputPlatformSummary = process.argv.includes('--platform-summary');

  let exitCode = 0;

  let updates = {};

  for (let [chain, pools] of Object.entries(chainPools)) {
    console.log(`Validating ${pools.length} pools in ${chain}...`);

    const uniquePoolId = new Set();
    const uniqueEarnedToken = new Set();
    const uniqueEarnedTokenAddress = new Set();
    const uniqueOracleId = new Set();
    const platformCounts = {};
    let activePools = 0;

    // Populate some extra data.
    const web3 = new Web3(chainRpcs[chain]);
    pools = await populateStrategyAddrs(chain, pools, web3);
    pools = await populateKeepers(chain, pools, web3);
    pools = await populateBeefyFeeRecipients(chain, pools, web3);
    pools = await populateOwners(chain, pools, web3);

    pools = override(pools);
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

      const { keeper, strategyOwner, vaultOwner, beefyFeeRecipient } =
        addressBook[chain].platforms.beefyfinance;

      updates = isKeeperCorrect(pool, chain, keeper, updates);
      updates = isStratOwnerCorrect(pool, chain, strategyOwner, updates);
      updates = isVaultOwnerCorrect(pool, chain, vaultOwner, updates);
      updates = isBeefyFeeRecipientCorrect(pool, chain, beefyFeeRecipient, updates);
    });
    if (!isEmpty(updates)) {
      exitCode = 1;
    }

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

  // Helpful data structures to correct addresses.
  console.log('Required updates.', JSON.stringify(updates));

  return exitCode;
};

// Validation helpers. These only log for now, could throw error if desired.
const isKeeperCorrect = (pool, chain, chainKeeper, updates) => {
  if (pool.keeper !== undefined && pool.keeper !== chainKeeper) {
    console.log(`Pool ${pool.id} should update keeper. From: ${pool.keeper} To: ${chainKeeper}`);

    if (!('keeper' in updates)) updates['keeper'] = {};
    if (!(chain in updates.keeper)) updates.keeper[chain] = {};

    if (pool.keeper in updates.keeper[chain]) {
      updates.keeper[chain][pool.keeper].push(pool.strategy);
    } else {
      updates.keeper[chain][pool.keeper] = [pool.strategy];
    }
  }

  return updates;
};

const isStratOwnerCorrect = (pool, chain, owner, updates) => {
  const validOwners = [...oldValidOwners, owner];
  if (pool.stratOwner !== undefined && !validOwners.includes(pool.stratOwner)) {
    console.log(`Pool ${pool.id} should update strat owner. From: ${pool.stratOwner} To: ${owner}`);

    if (!('stratOwner' in updates)) updates['stratOwner'] = {};
    if (!(chain in updates.stratOwner)) updates.stratOwner[chain] = {};

    if (pool.stratOwner in updates.stratOwner[chain]) {
      updates.stratOwner[chain][pool.stratOwner].push(pool.strategy);
    } else {
      updates.stratOwner[chain][pool.stratOwner] = [pool.strategy];
    }
  }

  return updates;
};

const isVaultOwnerCorrect = (pool, chain, owner, updates) => {
  const validOwners = [...oldValidOwners, owner];
  if (pool.vaultOwner !== undefined && !validOwners.includes(pool.vaultOwner)) {
    console.log(`Pool ${pool.id} should update vault owner. From: ${pool.vaultOwner} To: ${owner}`);

    if (!('vaultOwner' in updates)) updates['vaultOwner'] = {};
    if (!(chain in updates.vaultOwner)) updates.vaultOwner[chain] = {};

    if (pool.vaultOwner in updates.vaultOwner[chain]) {
      updates.vaultOwner[chain][pool.vaultOwner].push(pool.earnContractAddress);
    } else {
      updates.vaultOwner[chain][pool.vaultOwner] = [pool.earnContractAddress];
    }
  }

  return updates;
};

const isBeefyFeeRecipientCorrect = (pool, chain, recipient, updates) => {
  const validRecipients = oldValidFeeRecipients[chain] || [];
  if (
    pool.status === 'active' &&
    pool.beefyFeeRecipient !== undefined &&
    pool.beefyFeeRecipient !== recipient &&
    !validRecipients.includes(pool.beefyFeeRecipient)
  ) {
    console.log(
      `Pool ${pool.id} should update beefy fee recipient. From: ${pool.beefyFeeRecipient} To: ${recipient}`
    );

    if (!('beefyFeeRecipient' in updates)) updates['beefyFeeRecipient'] = {};
    if (!(chain in updates.beefyFeeRecipient)) updates.beefyFeeRecipient[chain] = {};

    if (pool.stratOwner in updates.beefyFeeRecipient[chain]) {
      updates.beefyFeeRecipient[chain][pool.stratOwner].push(pool.strategy);
    } else {
      updates.beefyFeeRecipient[chain][pool.stratOwner] = [pool.strategy];
    }
  }

  return updates;
};

// Helpers to populate required addresses.

const populateStrategyAddrs = async (chain, pools, web3) => {
  const multicall = new MultiCall(web3, addressBook[chain].platforms.beefyfinance.multicall);

  const calls = pools.map(pool => {
    const vaultContract = new web3.eth.Contract(vaultABI, pool.earnContractAddress);
    return {
      strategy: vaultContract.methods.strategy(),
    };
  });

  const [results] = await multicall.all([calls]);

  return pools.map((pool, i) => {
    return { ...pool, strategy: results[i].strategy };
  });
};

const populateKeepers = async (chain, pools, web3) => {
  const multicall = new MultiCall(web3, addressBook[chain].platforms.beefyfinance.multicall);

  const calls = pools.map(pool => {
    const stratContract = new web3.eth.Contract(strategyABI, pool.strategy);
    return {
      keeper: stratContract.methods.keeper(),
    };
  });

  const [results] = await multicall.all([calls]);

  return pools.map((pool, i) => {
    return { ...pool, keeper: results[i].keeper };
  });
};

const populateBeefyFeeRecipients = async (chain, pools, web3) => {
  const multicall = new MultiCall(web3, addressBook[chain].platforms.beefyfinance.multicall);

  const calls = pools.map(pool => {
    const stratContract = new web3.eth.Contract(strategyABI, pool.strategy);
    return {
      beefyFeeRecipient: stratContract.methods.beefyFeeRecipient(),
    };
  });

  const [results] = await multicall.all([calls]);

  return pools.map((pool, i) => {
    return { ...pool, beefyFeeRecipient: results[i].beefyFeeRecipient };
  });
};

const populateOwners = async (chain, pools, web3) => {
  const multicall = new MultiCall(web3, addressBook[chain].platforms.beefyfinance.multicall);

  const vaultCalls = pools.map(pool => {
    const vaultContract = new web3.eth.Contract(vaultABI, pool.earnContractAddress);
    return {
      owner: vaultContract.methods.owner(),
    };
  });

  const stratCalls = pools.map(pool => {
    const stratContract = new web3.eth.Contract(strategyABI, pool.strategy);
    return {
      owner: stratContract.methods.owner(),
    };
  });

  const [vaultResults] = await multicall.all([vaultCalls]);
  const [stratResults] = await multicall.all([stratCalls]);

  return pools.map((pool, i) => {
    return { ...pool, vaultOwner: vaultResults[i].owner, stratOwner: stratResults[i].owner };
  });
};

const override = pools => {
  Object.keys(overrides).forEach(id => {
    pools
      .filter(p => p.id.includes(id))
      .forEach(pool => {
        const override = overrides[id];
        Object.keys(override).forEach(key => {
          pool[key] = override[key];
        });
      });
  });
  return pools;
};

const exitCode = await validatePools();
process.exit(exitCode);
