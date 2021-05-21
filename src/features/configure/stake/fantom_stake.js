import { govPoolABI } from '../abi';

export const fantomStakePools = [
  {
    id: 'moo_ftm_usdc-est',
    name: 'Ester Finance',
    logo: 'fantom/USDC-FTM.png',
    token: 'mooBooFTM-USDC',
    tokenDecimals: 18,
    tokenAddress: '0x41D44B276904561Ac51855159516FD4cB2c90968',
    tokenOracle: 'lps',
    tokenOracleId: 'boo-ftm-usdc',
    earnedToken: 'EST',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x181F3F22C9a751E2ce673498A03E1FDFC0ebBFB6',
    earnContractAddress: '0xed5010eDF8812003B7d4c9a69E7AfCBceaB62F4f',
    earnContractAbi: govPoolABI,
    earnedOracle: 'tokens',
    earnedOracleId: 'EST',
    partnership: true,
    status: 'active',
    isMooStaked: true,
    periodFinish: 1622138639,
    partner: {
      logo: 'stake/esterfinance/logo.png',
      background: 'stake/esterfinance/background.png',
      text: 'Ester.Finance is a Decentralized Finance (DeFi) Yield Optimizer project on the Fantom Opera Blockchain. Ester can make you earn more crypto with crypto. Through a set of smart contracts and several investment strategies, Ester.Finance automatically maximizes the user rewards from various liquidity pools (LPs), automated market-making (AMM) projects, and other yield farming opportunities in the DeFi ecosystem. This provides a huge advantage over attempting to do this manually yourself.',
      website: 'https://app.ester.finance/',
      social: {
        telegram: '',
        twitter: 'https://twitter.com/EsterFinance',
      },
    },
  },
];
