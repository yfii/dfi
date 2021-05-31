import { govPoolABI } from '../abi';

export const polygonStakePools = [
  {
    id: 'bifi-polygon',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0xFbdd194376de19a88118e84E279b977f165d01b8',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'MATIC',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    earnContractAddress: '0xDeB0a777ba6f59C78c654B8c92F80238c8002DD2',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WMATIC',
    partnership: false,
    status: 'active',
    hideCountdown: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        background: 'stake/beefy/background.png',
        text: "You probably already knew that Beefy is the most trusted multi-chain yield optimizer. But did you know that Beefy has its own token? $BIFI has a maximum supply of 80000 tokens and there is no way to mint more. Everyone who holds our own $BIFI token can not only do cool stuff like create and vote on proposals, they also get a share of all harvests done, every hour, every day on all our Polygon vaults. That's a lot of Matic that goes straight to our $BIFI holders. All you have to do is stake your $BIFI in this vault, it’s that simple, come back and harvest your Matic whenever you need it!",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
  {
    id: 'moo_aave-eth',
    name: 'Iron / Garuda / Fanatics',
    logo: 'single-assets/ETH.png',
    token: 'mooAaveETH',
    tokenDecimals: 18,
    tokenAddress: '0x77276a7c9Ff3a6cbD334524d6F1f6219D039ac0E',
    tokenOracle: 'tokens',
    tokenOracleId: 'ETH',
    earnedToken: 'mooPolygonBIFI',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xfEcf784F48125ccb7d8855cdda7C5ED6b5024Cb3',
    earnContractAddress: '0x9B508ad657ed5A139D1a7c97fD84d7B7240849Cf',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'BIFI',
    partnership: true,
    status: 'active',
    isMooStaked: true,
    periodFinish: 1622830150,
    partners: [
      {
        logo: 'stake/garuda/logo.png',
        background: 'stake/polygon/background.png',
        text: `GarudaSwap is the 1st Next Generation Automatic Liquidity Acquisition yield farm and AMM decentralized exchange running on Binance Smart Chain with lots of unique and creative features that let you earn and win for a long time.`,
        website: 'https://garudaswap.finance/',
        social: {
          telegram: 'https://t.me/garudaswap',
          twitter: 'https://twitter.com/GarudaSwap',
        },
      },
      {
        logo: 'stake/ironfinance/logo.png',
        background: 'stake/polygon/background.png',
        text: `Inspired by FRAX, a unique fractionally-algorithmic stablecoin on the Ethereum network, and utilizing a similar approach, we have created IRON, the first partially-collateralized stablecoin on Binance Smart Chain. The IRON protocol makes use of 2 tokens to achieve its goal:  STEEL and IRON. 
      STEEL - The share token of the Iron finance protocol. Serves as part of the collateral behind IRON. Backed by seigniorage revenue as well as the value of any excess collateral. 
      IRON -  A stablecoin pegged to $1. Partially backed by a continuously adjusting ratio of collateral equal to $1 in value.
      Check out the docs for more information: https://docs.iron.finance/`,
        website: 'https://app.iron.finance/',
        social: {
          telegram: 'https://t.me/ironfinance',
          twitter: 'https://twitter.com/IronFinance',
        },
      },
      {
        logo: 'stake/fanatics/logo.png',
        background: 'stake/polygon/background.png',
        text: `fanatics.finance is a whole new Decentralized Exchange on Binance smart chain as known as 3° Generation yield farming mechanism that allows perpetual price increase with a sustainable and profitable farming yield with a Timelock contract at launch! And numerous new Features. Fanatics Finance is under Fanatics Finance is under license from KSOC Sports OÜ Registration: 16197453 Harju County, Tallinn, Kesklinna district, Pärnu mnt 158, ESTONIA.`,
        website: 'https://fanaticsfinance.com/',
        social: {
          telegram: 'https://t.me/fanaticsfinance_EN',
          twitter: 'https://twitter.com/fanaticsfinance',
        },
      },
    ],
  },
  {
    id: 'moo_aave-btc',
    name: 'Iron / Garuda / Fanatics',
    logo: 'single-assets/BTCB.svg',
    token: 'mooAaveWBTC',
    tokenDecimals: 8,
    tokenAddress: '0xD3395577febc6AdaB25490a69955ebC47040766C',
    tokenOracle: 'tokens',
    tokenOracleId: 'WBTC',
    earnedToken: 'mooPolygonBIFI',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xfEcf784F48125ccb7d8855cdda7C5ED6b5024Cb3',
    earnContractAddress: '0x20948Cad130c3D7B24d27CC66163b4aaed4684F0',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'BIFI',
    partnership: true,
    status: 'active',
    isMooStaked: true,
    periodFinish: 1622830106,
    partners: [
      {
        logo: 'stake/garuda/logo.png',
        background: 'stake/polygon/background.png',
        text: `GarudaSwap is the 1st Next Generation Automatic Liquidity Acquisition yield farm and AMM decentralized exchange running on Binance Smart Chain with lots of unique and creative features that let you earn and win for a long time.`,
        website: 'https://garudaswap.finance/',
        social: {
          telegram: 'https://t.me/garudaswap',
          twitter: 'https://twitter.com/GarudaSwap',
        },
      },
      {
        logo: 'stake/ironfinance/logo.png',
        background: 'stake/polygon/background.png',
        text: `Inspired by FRAX, a unique fractionally-algorithmic stablecoin on the Ethereum network, and utilizing a similar approach, we have created IRON, the first partially-collateralized stablecoin on Binance Smart Chain. The IRON protocol makes use of 2 tokens to achieve its goal:  STEEL and IRON. 
      STEEL - The share token of the Iron finance protocol. Serves as part of the collateral behind IRON. Backed by seigniorage revenue as well as the value of any excess collateral. 
      IRON -  A stablecoin pegged to $1. Partially backed by a continuously adjusting ratio of collateral equal to $1 in value.
      Check out the docs for more information: https://docs.iron.finance/`,
        website: 'https://app.iron.finance/',
        social: {
          telegram: 'https://t.me/ironfinance',
          twitter: 'https://twitter.com/IronFinance',
        },
      },
      {
        logo: 'stake/fanatics/logo.png',
        background: 'stake/polygon/background.png',
        text: `fanaticsfinance is a whole new Decentralized Exchange on Binance smart chain as known as 3° Generation yield farming mechanism that allows perpetual price increase with a sustainable and profitable farming yield with a Timelock contract at launch! And numerous new Features. Fanatics Finance is under Fanatics Finance is under license from KSOC Sports OÜ Registration: 16197453 Harju County, Tallinn, Kesklinna district, Pärnu mnt 158, ESTONIA.`,
        website: 'https://fanaticsfinance.com/',
        social: {
          telegram: 'https://t.me/fanaticsfinance_EN',
          twitter: 'https://twitter.com/fanaticsfinance',
        },
      },
    ],
  },
];
