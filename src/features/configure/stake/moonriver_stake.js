import { govPoolABI } from '../abi';

export const moonriverStakePools = [
  {
    id: 'bifi-moonriver',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0x173fd7434B8B50dF08e3298f173487ebDB35FD14',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'MOVR',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    earnContractAddress: '0x4Aabd0d73181325DD1609Ce696eF048702DE7153',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WMOVR',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        logoNight: 'stake/beefy/beefyfinance_night.png',
        background: 'stake/beefy/background.png',
        text: "Beefy Finance is The Multi-Chain Yield Optimizer across many sidechains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Moonriver, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, MOVR dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the MOVR you've earned.",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
