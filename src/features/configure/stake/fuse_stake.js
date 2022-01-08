import { govPoolABI } from '../abi';

export const fuseStakePools = [
  {
    id: 'bifi-fuse',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'FUSE',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
    earnContractAddress: '0x60a4DedF7fC45F73d9ca46222B016c2d755C79A8',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WFUSE',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        logoNight: 'stake/beefy/beefyfinance_night.png',
        background: 'stake/beefy/background.png',
        text: "Beefy Finance is The Multi-Chain Yield Optimizer across many sidechains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Fuse, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, FUSE dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the FUSE you've earned.",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
