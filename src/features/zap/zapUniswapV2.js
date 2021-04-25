import { pack, keccak256 } from '@ethersproject/solidity';
import { getCreate2Address } from '@ethersproject/address';
import { getNetworkTokens, getNetworkZaps, getNetworkCoin } from 'features/helpers/getNetworkData';

const availableZaps = getNetworkZaps();
const availableTokens = getNetworkTokens();
const nativeCoin = getNetworkCoin();

export const getEligibleZap = (pool) => {
  if (pool.assets.length !== 2) return undefined;

  const eligibleNativeCoin = []
  const tokenSymbols = pool.assets.map(symbol => {
    if (nativeCoin.symbol === symbol) {
      const wrappedToken = availableTokens.find(t => t.symbol === nativeCoin.wrappedSymbol)
      nativeCoin.address = wrappedToken.address;
      eligibleNativeCoin.push(nativeCoin)
      return nativeCoin.wrappedSymbol;
    }
    return symbol;
  });

  let tokenA, tokenB;
  const zap = availableZaps.find(zap => {
    tokenA = availableTokens.find(token => token.symbol === tokenSymbols[0]);
    tokenB = availableTokens.find(token => token.symbol === tokenSymbols[1]);
    if (tokenA && tokenB) {
      return pool.tokenAddress === computePairAddress(zap.ammFactory, zap.ammPairInitHash, tokenA.address, tokenB.address);
    } else {
      console.error('Beefy: tokens missing in the tokenlist:', tokenSymbols[0], tokenSymbols[1]);
    }
  });

  if (!zap) return undefined;

  tokenA.allowance = 0;
  tokenB.allowance = 0;

  return {
    zapAddress: zap.zapAddress,
    tokens: [tokenA, tokenB, ...eligibleNativeCoin],
  }
}

export const computePairAddress = (factoryAddress, pairInitHash, tokenA, tokenB) => {
  const [token0, token1] = sortTokens(tokenA, tokenB);
  return getCreate2Address(
    factoryAddress,
    keccak256(['bytes'], [pack(['address', 'address'], [token0, token1])]),
    pairInitHash
  )
}

export const sortTokens = (tokenA, tokenB) => {
  if (tokenA === tokenB) throw new RangeError(`tokenA should not be equal to tokenB: ${tokenB}`);
  return tokenA.toLowerCase() < tokenB.toLowerCase() ? [tokenA, tokenB] : [tokenB, tokenA]
}
