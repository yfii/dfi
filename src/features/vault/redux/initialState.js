import { getNetworkPools } from '../../helpers/getNetworkData';

const tokens = {};
const pools = getNetworkPools();

pools.forEach(({ token, tokenAddress, earnedToken, earnContractAddress, earnedTokenAddress }) => {
  tokens[token] = {
    tokenAddress: tokenAddress,
    tokenBalance: 0,
    allowance: {
      ...tokens[token]?.allowance,
      [earnContractAddress]: tokenAddress ? 0 : Infinity,
    },
  };
  tokens[earnedToken] = {
    tokenAddress: earnedTokenAddress,
    tokenBalance: 0,
    allowance: {
      [earnContractAddress]: 0,
    },
  };
});

const initialState = {
  pools,
  tokens,
  apys: {},
  fetchApysDone: false,
  fetchApysPending: false,
  fetchVaultsDataDone: false,
  fetchVaultsDataPending: false,
  fetchBalancesDone: false,
  fetchBalancesPending: false,
  fetchApprovalPending: {},
  fetchDepositPending: {},
  fetchZapDepositPending: {},
  fetchWithdrawPending: {},
  fetchHarvestPending: {},
  fetchZapEstimatePending: {},
};

export default initialState;
