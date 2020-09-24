import initialState from './initialState';
import { reducer as checkApprovalReducer} from './checkApproval';
import { reducer as fetchBalancesReducer } from './fetchBalances';
import { reducer as fetchApprovalReducer } from './fetchApproval';
import { reducer as fetchZapOrSwapReducer } from './fetchZapOrSwap';

const reducers = [
  fetchBalancesReducer,
  fetchApprovalReducer,
  fetchZapOrSwapReducer,
  checkApprovalReducer
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