import BigNumber from "bignumber.js";

export const erc20Tokens = {
  "eth/usdt lp": {
    tokenContractAddress: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
    tockeDescriptionUrl: 'LP',
    tockeDescription: 'LP',
    tokenDecimals: 18,
    tokenBalance: new BigNumber(0)
  },
  "weth": {
    tokenContractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    tockeDescriptionUrl: 'WETH',
    tockeDescription: 'WETH',
    tokenDecimals: 18,
    tokenBalance: new BigNumber(0)
  },
  "usdt": {
    tokenContractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    tockeDescriptionUrl: 'USDT',
    tockeDescription: 'USDT',
    tokenDecimals: 6,
    tokenBalance: new BigNumber(0)
  },
  "iETH/USDT": {
    tokenContractAddress: '0x7E43210a4c6831D421f57026617Fdfc8ED3A0baf',
    tockeDescriptionUrl: 'LP',
    tockeDescription: 'LP',
    tokenDecimals: 18,
    tokenBalance: new BigNumber(0)
  }
}