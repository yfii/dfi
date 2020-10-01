import { feeRewardsPoolAbi } from '../../configure';

const pools = [
  {
    name: 'pool1',
    token: 'BIFI',
    tokenDecimals: 18,
    tokenAddress: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
    earnedToken: 'BUSD',
    earnedTokenDecimals: 18,
    earnedTokenAddress: '0x1ca0e4dE7938F6F194831398e782cfbba3549e8D',
    earnContractAddress: '0x1ca0e4dE7938F6F194831398e782cfbba3549e8D',
    earnContractAbi: feeRewardsPoolAbi,
  },
];

const poolsInfo = [
  {
    name: 'pool4',
    staked: 0,
    tvl: 0,
    apy: 0,
  },
];

const allowance = [0, 0, 0, 0];
const balance = [0, 0, 0, 0];
const currentlyStaked = [0, 0, 0, 0];
const rewardsAvailable = [0, 0, 0, 0];
const halfTime = [0, 0, 0, 0];
const canWithdrawTime = [0, 0, 0, 0];

const initialState = {
  pools,
  allowance,
  currentlyStaked,
  rewardsAvailable,
  halfTime,
  canWithdrawTime,
  balance,
  poolsInfo,
  fetchPoolsInfoPending: false,
  checkApprovalPending: [false, false, false, false],
  fetchBalancePending: [false, false, false, false],
  fetchCurrentlyStakedPending: [false, false, false, false],
  fetchRewardsAvailablePending: [false, false, false, false],
  fetchHalfTimePending: [false, false, false, false],
  fetchCanWithdrawTimePending: [false, false, false, false],
  fetchApprovalPending: [false, false, false, false],
  fetchStakePending: [false, false, false, false],
  fetchWithdrawPending: [false, false, false, false],
  fetchClaimPending: [false, false, false, false],
  fetchExitPending: [false, false, false, false],
};

export default initialState;
