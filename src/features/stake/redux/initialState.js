import { feeRewardsPoolAbi } from '../../configure';

const pools = [
  {
    name: 'pool4',
    token: 'YFII',
    tokenDecimals: 18,
    tokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
    earnedToken: 'iUSDT',
    earnedTokenDecimals: 6,
    earnedTokenAddress: '0x72Cf258c852Dc485a853370171d46B9D29fD3184',
    earnContractAddress: '0x3d367c9529f260b0661e1c1e91167c9319ee96ca',
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

const allowance = [0];
const balance = [0];
const currentlyStaked = [0];
const rewardsAvailable = [0];
const halfTime = [0];
const canWithdrawTime = [0];

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
  checkApprovalPending: [false],
  fetchBalancePending: [false],
  fetchCurrentlyStakedPending: [false],
  fetchRewardsAvailablePending: [false],
  fetchHalfTimePending: [false],
  fetchCanWithdrawTimePending: [false],
  fetchApprovalPending: [false],
  fetchStakePending: [false],
  fetchWithdrawPending: [false],
  fetchClaimPending: [false],
  fetchExitPending: [false],
};

export default initialState;
