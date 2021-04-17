import { pack, keccak256 } from '@ethersproject/solidity';
import { getCreate2Address } from '@ethersproject/address';

import { bscZaps } from 'features/configure/zap/bsc_zaps';
import bscTokenList from 'assets/tokenlists/beefy-bsc-tokenlist.json';

const availableZaps = [
  ...bscZaps,
]

const availableTokens = [
  ...bscTokenList.tokens,
]

const nativeCoins = [
  {
    chainId: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    wrappedSymbol: 'WETH',
  },
  {
    chainId: 56,
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
    wrappedSymbol: 'WBNB',
  },
  {
    chainId: 128,
    name: 'Heco Token',
    symbol: 'HT',
    decimals: 18,
    wrappedSymbol: 'WHT',
  },
  {
    chainId: 43114,
    name: 'Avalance Coin',
    symbol: 'AVAX',
    decimals: 18,
    wrappedSymbol: 'WAVAX',
  },
]

export const getEligibleZap = (pool) => {
  if (pool.assets.length !== 2) return undefined;

  let nativeCoin = [];
  const tokenSymbols = pool.assets.map(symbol => {
    const coin = nativeCoins.find(c => c.symbol === symbol && c.chainId === pool.chainId)
    if (coin) {
      nativeCoin.push(coin)
      return coin.wrappedSymbol;
    }
    return symbol;
  });

  let tokenA, tokenB;
  const zap = availableZaps.filter(zap => Number(zap.chainId) === Number(pool.chainId)).find(zap => {
    tokenA = availableTokens.find(token => token.symbol === tokenSymbols[0] && Number(token.chainId) === Number(zap.chainId));
    tokenB = availableTokens.find(token => token.symbol === tokenSymbols[1] && Number(token.chainId) === Number(zap.chainId));
    if (tokenA && tokenB) {
      return pool.tokenAddress === computePairAddress(zap.ammFactory, zap.ammPairInitHash, tokenA.address, tokenB.address);
    } else {
      console.error('Beefy: tokens missing in the tokenlist:', tokenSymbols[0], tokenSymbols[1]);
    }
  });

  if (!zap) return undefined;

  return {
    zapAddress: zap.zapAddress,
    tokens: [tokenA, tokenB, ...nativeCoin],
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
