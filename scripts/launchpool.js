// To run: yarn launchpool bsc <0x12312312> CafeSwap
import { MultiCall } from 'eth-multicall';
import { addressBook } from 'blockchain-addressbook';
import Web3 from 'web3';

import { bscPools } from '../src/features/configure/vault/bsc_pools.js';
import { hecoPools } from '../src/features/configure/vault/heco_pools.js';
import { avalanchePools } from '../src/features/configure/vault/avalanche_pools.js';
import { polygonPools } from '../src/features/configure/vault/polygon_pools.js';
import { fantomPools } from '../src/features/configure/vault/fantom_pools.js';
import { harmonyPools } from '../src/features/configure/vault/harmony_pools.js';
import { arbitrumPools } from '../src/features/configure/vault/arbitrum_pools.js';
import { launchPoolABI, erc20ABI } from '../src/features/configure/abi.js';

const chainPools = {
  bsc: bscPools,
  heco: hecoPools,
  avax: avalanchePools,
  polygon: polygonPools,
  fantom: fantomPools,
  one: harmonyPools,
  arbitrum: arbitrumPools,
};

const chainRpcs = {
  bsc: process.env.BSC_RPC || 'https://bsc-dataseed.binance.org/',
  heco: process.env.HECO_RPC || 'https://http-mainnet.hecochain.com',
  avax: process.env.AVAX_RPC || 'https://api.avax.network/ext/bc/C/rpc',
  polygon: process.env.POLYGON_RPC || 'https://polygon-rpc.com',
  fantom: process.env.FANTOM_RPC || 'https://rpc.ftm.tools/',
  one: process.env.HARMONY_RPC || 'https://api.s0.t.hmny.io/',
  arbitrum: process.env.ARBITRUM_RPC || 'https://arb1.arbitrum.io/rpc',
};

async function boostParams(chain, boostAddress) {
  const web3 = new Web3(chainRpcs[chain]);
  const boostContract = new web3.eth.Contract(launchPoolABI, boostAddress);
  const multicall = new MultiCall(web3, addressBook[chain].platforms.beefyfinance.multicall);
  let calls = [
    {
      staked: boostContract.methods.stakedToken(),
      reward: boostContract.methods.rewardToken(),
      duration: boostContract.methods.duration(),
    },
  ];
  let [results] = await multicall.all([calls]);
  const params = results[0];

  const tokenContract = new web3.eth.Contract(erc20ABI, params.reward);
  calls = [
    {
      earnedToken: tokenContract.methods.symbol(),
      earnedTokenDecimals: tokenContract.methods.decimals(),
    },
  ];
  [results] = await multicall.all([calls]);
  const token = results[0];

  return { ...params, ...token };
}

async function generateLaunchpool() {
  const chain = process.argv[2];
  const boostAddress = process.argv[3];
  const partner = process.argv[4];
  const partnerId = partner.toLowerCase();

  const boost = await boostParams(chain, boostAddress);
  const pool = chainPools[chain].find(pool => pool.earnedTokenAddress === boost.staked);

  const periodFinish = Math.floor(Date.now() / 1000) + Number(boost.duration) + 172800;

  const newBoost = {
    id: `moo_${pool.oracleId}-${partnerId}`,
    name: `${partner}`,
    logo: pool.logo,
    assets: pool.assets,
    token: pool.earnedToken,
    tokenDecimals: 18,
    tokenAddress: boost.staked,
    tokenOracle: pool.oracle,
    tokenOracleId: pool.oracleId,
    earnedToken: boost.earnedToken,
    earnedTokenDecimals: Number(boost.earnedTokenDecimals),
    earnedTokenAddress: boost.reward,
    earnContractAddress: boostAddress,
    earnContractAbi: 'govPoolABI',
    earnedOracle: 'tokens',
    earnedOracleId: boost.earnedToken,
    partnership: true,
    status: 'active',
    isMooStaked: true,
    periodFinish: periodFinish,
    partners: [
      {
        logo: `stake/${partnerId}/logo.png`,
        background: `stake/${partnerId}/bg.png`,
        text: '',
        website: '',
        social: {
          telegram: '',
          twitter: '',
        },
      },
    ],
  };

  if (newBoost.logo) {
    delete newBoost.assets;
  } else {
    delete newBoost.logo;
  }

  let str = JSON.stringify(newBoost, null, 2) + ',';
  str = str.replace('"govPoolABI"', 'govPoolABI');

  console.log(str);
}

await generateLaunchpool();
