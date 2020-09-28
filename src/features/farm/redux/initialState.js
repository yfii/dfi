import {pool4Abi} from "../../configure";

const pools = [
  {
    name: 'YFII',
    description: '',
    token: 'YFII',
    tokenDescription: 'YFII',
    tokenDecimals: 18,
    tokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
    earnedToken: 'MEFI',
    earnedTokenDescription: '',
    earnedTokenDecimals: 8,
    earnedTokenAddress: '0x1a969239E12F07281f8876D11AfceE081D872adf',
    earnContractAddress: '0x6A77c0c917Da188fBfa9C380f2E60dd223c0c35a',
    earnContractAbi: pool4Abi,
    color: '255,45,130',
    startTimestamp: 1601373600,
    earnTime: 1 * 7 * 24 * 3600,
    earnedTokenUrl: 'https://meet.one'
  },
  {
    name: 'mefilp',
    description: '',
    token: 'MEFI/ETH',
    tokenDescription: 'MEFI-ETH UNI-V2 LP',
    tokenDecimals: 18,
    tokenAddress: '0xc4b478E749dbCFDdF96C6f84f4133E2f03c345a9',
    earnedToken: 'MEFI',
    earnedTokenDescription: '',
    earnedTokenDecimals: 8,
    earnedTokenAddress: '0x1a969239E12F07281f8876D11AfceE081D872adf',
    earnContractAddress: '0x6CA21695CB12A251bB19aE73Bda6964f1BBc48De',
    earnContractAbi: pool4Abi,
    color: '254,119,0',
    startTimestamp: 1601373600,
    earnTime: 2 * 7 * 24 * 3600,
    earnedTokenUrl: 'https://meet.one'
  },
];

const length = pools.length;
const poolsInfo = Array(length).fill({staked: 0, tvl: 0, apy: 0});
const fetchPoolsInfoPending = false;
const allowance = Array(length).fill(0);
const checkApprovalPending = Array(length).fill(false);
const balance = Array(length).fill(0);
const fetchBalancePending = Array(length).fill(false);
const currentlyStaked = Array(length).fill(0);
const fetchCurrentlyStakedPending = Array(length).fill(false);
const rewardsAvailable = Array(length).fill(0);
const fetchRewardsAvailablePending = Array(length).fill(false);
const fetchApprovalPending = Array(length).fill(false);
const fetchStakePending = Array(length).fill(false);
const fetchWithdrawPending = Array(length).fill(false);
const fetchClaimPending = Array(length).fill(false);
const fetchExitPending = Array(length).fill(false);

const initialState = {
  pools,
  poolsInfo,
  fetchPoolsInfoPending,
  allowance,
  checkApprovalPending,
  balance,
  fetchBalancePending,
  currentlyStaked,
  fetchCurrentlyStakedPending,
  rewardsAvailable,
  fetchRewardsAvailablePending,
  fetchApprovalPending,
  fetchStakePending,
  fetchWithdrawPending,
  fetchClaimPending,
  fetchExitPending
};

export default initialState;