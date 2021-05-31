import { govPoolABI } from '../abi';

export const avalancheStakePools = [
  {
    id: 'bifi-avax',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0xd6070ae98b8069de6B494332d1A1a81B6179D960',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'AVAX',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    earnContractAddress: '0x86d38c6b6313c5a3021d68d1f57cf5e69197592a',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WAVAX',
    partnership: false,
    status: 'active',
    hideCountdown: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        background: 'stake/beefy/background.png',
        text: "You probably already knew that Beefy is the most trusted Yield optimizer for the Binance Smart Chain. But did you know that Beefy has its own token? $BIFI has a maximum supply of 80000 tokens and there is no way to mint more. Everyone who holds our own $BIFI token can not only do cool stuff like create and vote on proposals, they also get a share of all harvests done, every hour, every day on all our Avalanche vaults. That's a lot of AVAX that goes straight to our $BIFI holders. All you have to do is stake your $BIFI in this vault, it’s that simple, come back and harvest your AVAX whenever you need it!",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
