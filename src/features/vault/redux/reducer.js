import initialState from './initialState';
import { reducer as fetchBalancesReducer } from './fetchBalances';
import { reducer as fetchPoolBalancesReducer } from './fetchPoolBalances';
import { reducer as fetchOraclePricesReducer } from './fetchOraclePrices';
import { reducer as fetchPricePerShareReducer } from './fetchPricePerShare';
import { reducer as fetchUserPoolBalancesReducer } from './fetchUserPoolBalances';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchDepositReducer } from './fetchDeposit';
import { reducer as fetchWithdrawReducer } from './fetchWithdraw';
import { reducer as fetchApysReducer } from './fetchApys';

const reducers = [
  fetchBalancesReducer,
  fetchPoolBalancesReducer,
  fetchOraclePricesReducer,
  fetchPricePerShareReducer,
  fetchUserPoolBalancesReducer,
  fetchApprovalReducer,
  fetchDepositReducer,
  fetchWithdrawReducer,
  fetchApysReducer,
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
