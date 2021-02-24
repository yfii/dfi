import { pools } from '../../configure';

const tokens = {};

pools.forEach(({ token, tokenAddress, earnedToken, earnedTokenAddress }) => {
  tokens[token] = {
    tokenAddress: tokenAddress,
    tokenBalance: 0,
  };
  tokens[earnedToken] = {
    tokenAddress: earnedTokenAddress,
    tokenBalance: 0,
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
  fetchWithdrawPending: {},
  fetchHarvestPending: {},
};

export default initialState;
