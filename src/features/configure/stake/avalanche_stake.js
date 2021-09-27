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
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        background: 'stake/beefy/background.png',
        text: "Beefy Finance is The Multi-Chain Yield Optimizer across many blockchains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Avalanche, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, AVAX dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the AVAX you've earned.",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
