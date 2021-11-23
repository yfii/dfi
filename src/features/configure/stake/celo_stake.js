import { govPoolABI } from '../abi';

export const celoStakePools = [
  {
    id: 'bifi-celo',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'CELO',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x471EcE3750Da237f93B8E339c536989b8978a438',
    earnContractAddress: '0x2D250016E3621CfC50A0ff7e5f6E34bbC6bfE50E',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'CELO',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        logoNight: 'stake/beefy/beefyfinance_night.png',
        background: 'stake/beefy/background.png',
        text: "Beefy Finance is The Multi-Chain Yield Optimizer across many sidechains, enabling users to earn autocompounded yield on their crypto. Did you know also that you can own a piece of Beefy itself? Beefy runs on its governance token, BIFI. The token has a set supply of 80,000 across all chains; no more may be minted, ever! As a holder of BIFI you may create and vote on important DAO proposals, and you become dividend-eligible to earn a share of every compounding harvest on Beefy vaults, hour by hour. Here on Celo, you just need to stake BIFI in this reward pool, or in the autocompounding BIFI Maxi vault on the main page. For this pool, CELO dividends are gathered and sent proportionally to each staker. Stake here, return later to claim the CELO you've earned.",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
