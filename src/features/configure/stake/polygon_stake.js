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
    partner: {
      logo: 'stake/beefy/beefyfinance.png',
      background: 'stake/beefy/background.png',
      text:
        "You probably already knew that Beefy is the most trusted multi-chain yield optimizer. But did you know that Beefy has its own token? $BIFI has a maximum supply of 80000 tokens and there is no way to mint more. Everyone who holds our own $BIFI token can not only do cool stuff like create and vote on proposals, they also get a share of all harvests done, every hour, every day on all our Polygon vaults. That's a lot of Matic that goes straight to our $BIFI holders. All you have to do is stake your $BIFI in this vault, it’s that simple, come back and harvest your Matic whenever you need it!",
      website: 'https://app.beefy.finance',
      social: {
        telegram: 'http://t.me/beefyfinance',
        twitter: 'https://twitter.com/beefyfinance',
      },
    },
  },
];
