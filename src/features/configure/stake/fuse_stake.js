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

  {
    id: 'moo_voltage-wfuse-elon-elon',
    name: 'Dogelon Mars x Fuse',
    assets: ['ELON', 'FUSE'],
    token: 'mooVoltageFUSE-ELON',
    tokenDecimals: 18,
    tokenAddress: '0xa7224e31367069637A8C2cc0aa10B7A90D9343C1',
    tokenOracle: 'lps',
    tokenOracleId: 'voltage-wfuse-elon',
    earnedToken: 'ELON-FUSE LP',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xe418c323fA450e7e18c4dB304bEFC7ffF92D2Cc1',
    earnContractAddress: '0xc3a4fdcba79DB04b4C3e352b1C467B3Ba909D84A',
    earnContractAbi: govPoolABI,
    earnedOracle: 'lps',
    earnedOracleId: 'voltage-wfuse-elon',
    partnership: true,
    status: 'active',
    isMooStaked: true,
    periodFinish: 1652625028,
    partners: [
      {
        logo: 'stake/elon/logo.png',
        background: 'stake/elon/bg.png',
        text:
          'We are thrilled to announce that the Dogelon Mars (ELON) token has now been ported to the Fuse Network blockchain. Fuse Network becomes only the third blockchain on which the token has officially been enabled (in addition to Ethereum and Polygon). \n' +
          'A FUSE/ELON trading pool has been created on the Voltage Finance (formerly, FuseFi) decentralized exchange (DEX).\n' +
          'We are boosting this pool with more tokens of the same kind you deposited. Claim the rewards and you will see them already staked in the vault.',
        website: 'https://dogelonmars.com/',
        social: {
          telegram: 'https://t.me/dogelonmars',
          twitter: 'https://twitter.com/DogelonMars',
        },
      },
    ],
  },

  {
    id: 'moo_fusefi-wfuse-usdc-fuse',
    name: 'Fuse',
    assets: ['USDC', 'FUSE'],
    token: 'mooFuseFiUSDC-FUSE',
    tokenDecimals: 18,
    tokenAddress: '0x98d3913474fccEDeB63077237914be00202fB007',
    tokenOracle: 'lps',
    tokenOracleId: 'voltage-wfuse-usdc',
    earnedToken: 'mooFuse',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x2C43DBef81ABa6b95799FD2aEc738Cd721ba77f3',
    earnContractAddress: '0x405EE7F4f067604b787346bC22ACb66b06b15A4B',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WFUSE',
    partnership: true,
    status: 'active',
    isMooStaked: true,
    periodFinish: 1644834178,
    partners: [
      {
        logo: 'stake/fuse/logo.png',
        background: 'stake/fuse/bg.png',
        text: 'Fuse is a platform featuring a fast and low-cost, Ethereum-compatible blockchain, a robust plug-and-play mobile-centric crypto payments infrastructure for creating token-based applications and a rapidly growing ecosystem of payments, decentralized finance and NFT projects.',
        website: 'https://www.fuse.io',
        social: {
          telegram: 'https://t.me/fuseio',
          twitter: 'https://twitter.com/Fuse_network',
        },
      },
    ],
  },
];
