import initialState from './initialState';
import { reducer as fetchBalancesReducer } from './fetchBalances';
import { reducer as fetchVaultsData } from './fetchVaultsData';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchDepositReducer } from './fetchDeposit';
import { reducer as fetchWithdrawReducer } from './fetchWithdraw';
import { reducer as fetchApysReducer } from './fetchApys';
import { reducer as fetchZapEstimateReducer } from './fetchZapEstimate';
import { reducer as fetchBifiBuybackReducer } from './fetchBifiBuyback';
import { reducer as updateLaunchpoolsReducer } from './updateLaunchpools';

const reducers = [
  fetchVaultsData,
  fetchApprovalReducer,
  fetchDepositReducer,
  fetchWithdrawReducer,
  fetchApysReducer,
  fetchZapEstimateReducer,
  fetchBalancesReducer,
  fetchBifiBuybackReducer,
  updateLaunchpoolsReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
