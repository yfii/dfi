import { getNetworkPools } from '../../helpers/getNetworkData';
import { getEligibleZap } from 'features/zap/zapUniswapV2';

const tokens = {};
const pools = getNetworkPools();

pools.forEach(
  (
    { token, tokenDecimals, tokenAddress, earnedToken, earnContractAddress, earnedTokenAddress },
    i
  ) => {
    tokens[token] = {
      symbol: token,
      decimals: tokenDecimals,
      tokenAddress: tokenAddress,
      tokenBalance: 0,
      allowance: {
        ...tokens[token]?.allowance,
        [earnContractAddress]: tokenAddress ? 0 : Infinity,
      },
    };
    tokens[earnedToken] = {
      symbol: earnedToken,
      decimals: 18,
      tokenAddress: earnedTokenAddress,
      tokenBalance: 0,
      allowance: {
        [earnContractAddress]: 0,
      },
    };

    const pool = pools[i];
    if (pool.status === 'active') {
      const zap = getEligibleZap(pool);
      if (zap) {
        tokens[token].allowance[zap.zapAddress] = tokenAddress ? 0 : Infinity;
        tokens[earnedToken].allowance[zap.zapAddress] = 0;
        pool['zap'] = zap;
      }
    }
  }
);

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
