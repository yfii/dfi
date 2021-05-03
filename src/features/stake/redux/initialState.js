import { getNetworkStakePools } from '../../helpers/getNetworkData';

const pools = getNetworkStakePools();
let poolsInfo = [];
const poolData = [];
const initPoolsInfo = () => {
  for (let key in pools) {
    poolData.push({
      id: pools[key].id,
      name: pools[key].name,
      staked: 0,
      tvl: 0,
      apy: 0,
    });
  }
  poolsInfo = poolData;
};

initPoolsInfo();

const allowance = [0, 0, 0, 0, 0];
const balance = [0, 0, 0, 0, 0];
const currentlyStaked = [0, 0, 0, 0, 0];
const rewardsAvailable = [0, 0, 0, 0, 0];
const halfTime = [];
const canWithdrawTime = [0, 0, 0, 0, 0];

const initialState = {
  pools,
  allowance,
  currentlyStaked,
  rewardsAvailable,
  halfTime,
  canWithdrawTime,
  balance,
  poolsInfo,
  poolData,
  fetchPoolDataPending: [false],
  checkApprovalPending: [false, false, false, false, false],
  fetchBalancePending: [false, false, false, false, false],
  fetchCurrentlyStakedPending: [false, false, false, false, false],
  fetchRewardsAvailablePending: [false, false, false, false, false],
  fetchHalfTimePending: [false, false, false, false, false],
  fetchCanWithdrawTimePending: [false, false, false, false, false],
  fetchApprovalPending: [false, false, false, false, false],
  fetchStakePending: [false, false, false, false, false],
  fetchWithdrawPending: [false, false, false, false, false],
  fetchClaimPending: [false, false, false, false, false],
  fetchExitPending: [false, false, false, false, false],
  fetchZapEstimatePending: [false, false, false, false, false],
};

export default initialState;
