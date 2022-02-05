import { govPoolABI } from '../abi';

export const auroraStakePools = [
  {
    id: 'bifi-aurora',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0x218c3c3D49d0E7B37aff0D8bB079de36Ae61A4c0',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'ETH',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB',
    earnContractAddress: '0xE6ab45f5e93FA377D0c4cC097187Ab7256c2AEBf',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'ETH',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        logoNight: 'stake/beefy/beefyfinance_night.png',
        background: 'stake/beefy/background.png',
        text: "Beefy Finance is The Multi-Chain Yield Optimizer across many sidechains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Aurora, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, ETH dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the ETH you've earned.",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
