import initialState from './initialState';
import { reducer as fetchPoolsInfoReducer} from './fetchPoolsInfo';
import { reducer as checkApprovalReducer} from './checkApproval';
import { reducer as fetchBalanceReducer} from './fetchBalance';
import { reducer as fetchBalancesReducer} from './fetchBalances';
import { reducer as fetchDepositReducer } from './fetchDeposit';
import { reducer as fetchWithdrawReducer } from './fetchWithdraw';
import { reducer as fetchPricePerFullShare } from './fetchPricePerFullShare';
// import { reducer as fetchCurrentlyStakedReducer } from './fetchCurrentlyStaked';
// import { reducer as fetchRewardsAvailableReducer } from './fetchRewardsAvailable';
// import { reducer as fetchHalfTimeReducer } from './fetchHalfTime';
// import { reducer as fetchCanWithdrawTimeReducer } from './fetchCanWithdrawTime';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchPairPriceOut} from './fetchPairPriceOut';
// import { reducer as fetchStakeReducer } from './fetchStake';
// import { reducer as fetchWithdrawReducer } from './fetchWithdraw';
// import { reducer as fetchClaimReducer } from './fetchClaim';
// import { reducer as fetchExitReducer } from './fetchExit';


const reducers = [
  fetchPoolsInfoReducer,
  checkApprovalReducer,
  fetchBalanceReducer,
  fetchBalancesReducer,
  fetchDepositReducer,
  fetchWithdrawReducer,
  // fetchCurrentlyStakedReducer,
  // fetchRewardsAvailableReducer,
  // fetchHalfTimeReducer,
  // fetchCanWithdrawTimeReducer,
  fetchApprovalReducer,
  fetchPricePerFullShare,
  fetchPairPriceOut,
  // fetchStakeReducer,
  // fetchWithdrawReducer,
  // fetchClaimReducer,
  // fetchExitReducer
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