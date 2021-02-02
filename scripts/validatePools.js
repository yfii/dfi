// To run: yarn validate

import { pools } from '../src/features/configure/pools.js';

let valid = true;
const uniquePoolId = new Set();
const uniqueEarnedToken = new Set();
const uniqueEarnedTokenAddress = new Set();
const uniqueOracleId = new Set();
const messages = [];
let activePools = 0;

console.log(`Validating ${pools.length} pools...`);

pools.forEach(pool => {
  // Errors, should not proceed with build
  if (uniquePoolId.has(pool.id)) {
    messages.push(`Error: ${pool.id} : Pool id duplicated: ${pool.id}`);
    valid = false;
  }

  if (uniqueEarnedToken.has(pool.earnedToken)) {
    if (pool.id === 'venus-wbnb') return; // Special case, supposed to be same as venus-bnb
    messages.push(`Error: ${pool.id} : Pool earnedToken duplicated: ${pool.earnedToken}`);
    valid = false;
  }

  if (uniqueEarnedTokenAddress.has(pool.earnedTokenAddress)) {
    if (pool.id === 'venus-wbnb') return; // Special case, supposed to be same as venus-bnb
    messages.push(`Error: ${pool.id} : Pool earnedTokenAddress duplicated: ${pool.earnedTokenAddress}`);
    valid = false;
  }

  if (pool.earnedTokenAddress !== pool.earnContractAddress) {
    messages.push(`Error: ${pool.id} : Pool earnedTokenAddress not same as earnedContractAddress: ${pool.earnedTokenAddress}, ${pool.earnedContractAddress}`);
    valid = false;
  }

  // Warnings, check if intended
  if (!pool.name.toLowerCase().includes(pool.token.toLowerCase())) {
    messages.push(`Warning: ${pool.id} : Pool name not same token type as token: ${pool.name}, ${pool.token}`);
  }

  if (uniqueOracleId.has(pool.oracleId)) {
    messages.push(`Warning: ${pool.id} : Pool oracleId duplicated: ${pool.oracleId}`);
  }

  if (pool.status === 'active') {
    activePools++;
  }

  uniquePoolId.add(pool.id);
  uniqueEarnedToken.add(pool.earnedToken);
  uniqueEarnedTokenAddress.add(pool.earnedTokenAddress);
  uniqueOracleId.add(pool.oracleId);
})

console.log(`Active pools: ${activePools}/${pools.length}`)

if (messages.length == 0) { 
  console.log('Pools validation success.')
} else {
  messages.forEach(err => console.log(err))
  console.log(`Pools validation finished with ${valid ? 'warnings.' : 'errors!'}`)
} 