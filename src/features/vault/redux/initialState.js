import { getNetworkPools, launchpools } from '../../helpers/getNetworkData';
import { getEligibleZap } from 'features/zap/zapUniswapV2';

const tokens = {};
const pools = getNetworkPools();

const zapMap = {};

pools.forEach(
  (
    {
      token,
      tokenDecimals,
      tokenAddress,
      earnedToken,
      earnContractAddress,
      earnedTokenAddress,
      withdrawalFee,
      depositFee,
    },
    i
  ) => {
    if (!withdrawalFee) pools[i].withdrawalFee = '0.1%';
    if (!depositFee) pools[i].depositFee = '0%';

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

    const zap = getEligibleZap(pools[i]);
    if (zap) {
      tokens[token].allowance[zap.zapAddress] = tokenAddress ? 0 : Infinity;
      tokens[earnedToken].allowance[zap.zapAddress] = 0;
      pools[i]['zap'] = zap;
      zapMap[pools[i].id] = zap;
    }
  }
);

const now = Date.now() / 1000;
const initialState = {
  pools,
  tokens,
  apys: {},
  bifibuyback: {},
  fetchApysDone: false,
  fetchApysPending: false,
  fetchVaultsDataDone: false,
  fetchVaultsDataPending: false,
  fetchBalancesDone: false,
  fetchBalancesPending: false,
  fetchBifibuybackDone: false,
  fetchBifibuybackPending: false,
  fetchApprovalPending: {},
  fetchDepositPending: {},
  fetchZapDepositPending: {},
  fetchWithdrawPending: {},
  fetchHarvestPending: {},
  fetchZapEstimatePending: {},
  vaultLaunchpool: Object.fromEntries(
    pools.map(vault => {
      const launchpool = Object.values(launchpools).find(
        lp => lp.token === vault.earnedToken && lp.status !== 'closed' && lp.periodFinish >= now
      );

      return [vault.id, launchpool ? launchpool.id : null];
    })
  ),
  vaultLaunchpools: Object.fromEntries(
    pools.map(vault => {
      const activeLaunchpools = Object.values(launchpools)
        .filter(
          lp => lp.token === vault.earnedToken && lp.status !== 'closed' && lp.periodFinish >= now
        )
        .map(lp => lp.id);

      return [vault.id, activeLaunchpools];
    })
  ),
};

const allZaps = Object.keys(zapMap);
console.log('Total number of zaps: ' + allZaps.length.toString());

export default initialState;
