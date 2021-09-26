import { govPoolABI } from '../abi';

export const arbitrumStakePools = [
  {
    id: 'bifi-eth',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0x99C409E5f62E4bd2AC142f17caFb6810B8F0BAAE',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'ETH',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    earnContractAddress: '0x48F4634c8383aF01BF71AefBC125eb582eb3C74D',
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
        text: 'You probably already know that Beefy Finance is The Multi-Chain Yield Optimizer across many sidechains, allowing users to earn autocompouned yield on their crypto. Well, you can also own your part of the platform. Beefy runs on its own governance token, BIFI. BIFI has a set supply of 80,000 across all chains; no more may be minted. A holder of BIFI may create and vote on important DAO proposals, and she is dividend-eligible to receive a share of each vault harvest, every hour, every day on Beefy vaults. On Arbitrum, you only need to stake BIFI in this vault, or in the autocompounding BIFI Maxi vault on the main page. For this vault, new ETH is generated and sent straight to each staker. Just stake here, and come back to reap the extra ETH when you wish.',
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
