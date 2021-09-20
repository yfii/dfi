import { govPoolABI } from '../abi';

export const harmonyStakePools = [
  {
    id: 'bifi-harmony',
    name: 'BIFI',
    logo: 'single-assets/BIFI.png',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0x6aB6d61428fde76768D7b45D8BFeec19c6eF91A8',
    tokenOracle: 'tokens',
    tokenOracleId: 'BIFI',
    earnedToken: 'WONE',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
    earnContractAddress: '0x5B96bbAca98D777cb736dd89A519015315E00D02',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'WONE',
    partnership: false,
    status: 'active',
    fixedStatus: true,
    partners: [
      {
        logo: 'stake/beefy/beefyfinance.png',
        background: 'stake/beefy/background.png',
        text: "You probably already knew that Beefy is the most trusted Yield optimizer for the Binance Smart Chain. But did you know that Beefy has its own token? $BIFI has a maximum supply of 80000 tokens and there is no way to mint more. Everyone who holds our own $BIFI token can not only do cool stuff like create and vote on proposals, they also get a share of all harvests done, every hour, every day on all our Harmony vaults. That's a lot of ONE that goes straight to our $BIFI holders. All you have to do is stake your $BIFI in this vault, it’s that simple, come back and harvest your ONE whenever you need it!",
        website: 'https://app.beefy.finance',
        social: {
          telegram: 'http://t.me/beefyfinance',
          twitter: 'https://twitter.com/beefyfinance',
        },
      },
    ],
  },
];
