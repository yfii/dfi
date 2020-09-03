import initialState from './initialState';
import { reducer as fetchBalancesReducer } from './fetchBalances';
import { reducer as fetchPoolBalancesReducer } from './fetchPoolBalances';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchDepositReducer } from './fetchDeposit';
import { reducer as fetchWithdrawReducer } from './fetchWithdraw';

const reducers = [
  fetchBalancesReducer,
  fetchPoolBalancesReducer,
  fetchApprovalReducer,
  fetchDepositReducer,
  fetchWithdrawReducer,
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