import initialState from './initialState';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchStakeReducer } from './fetchStake';
import { reducer as fetchWithdrawReducer } from './fetchWithdraw';
import { reducer as fetchClaimReducer } from './fetchClaim';
import { reducer as fetchExitReducer } from './fetchExit';
import { reducer as subscriptionReducer } from './subscription';

const reducers = [
  fetchApprovalReducer,
  fetchStakeReducer,
  fetchWithdrawReducer,
  fetchClaimReducer,
  fetchExitReducer,
  subscriptionReducer,
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
