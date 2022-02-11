import { govPoolABI } from '../abi';

export const moonbeamStakePools = [
  {
    id: 'bifi-moonbeam',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0x595c8481c48894771CE8FaDE54ac6Bf59093F9E8',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'GLMR',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xAcc15dC74880C9944775448304B263D191c6077F',
    earnContractAddress: '0x1198f78efd67DFc917510aaA07d49545f4B24f11',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'GLMR',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        logoNight: 'stake/beefy/beefyfinance_night.png',
        background: 'stake/beefy/background.png',
        text: "Beefy Finance is The Multi-Chain Yield Optimizer across many sidechains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Moonbeam, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, GLMR dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the GLMR you've earned.",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
