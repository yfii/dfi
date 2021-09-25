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
        text: "You probably already knew that Beefy is the most trusted Yield optimizer for the Binance Smart Chain. But did you know that Beefy has its own token? $BIFI has a maximum supply of 80000 tokens and there is no way to mint more. Everyone who holds our own $BIFI token can not only do cool stuff like create and vote on proposals, they also get a share of all harvests done, every hour, every day on all our +120 vaults. That's a lot of BNB that goes straight to our $BIFI holders. All you have to do is stake your $BIFI in this vault, it’s that simple, come back and harvest your BNB whenever you need it! (You can still vote on proposals even though you have staked your $BIFI here).",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
