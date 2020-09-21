import initialState from './initialState';
import { reducer as fetchPoolsInfoReducer} from './fetchPoolsInfo';
import { reducer as checkApprovalReducer} from './checkApproval';
import { reducer as fetchBalanceReducer} from './fetchBalance';
import { reducer as fetchCurrentlyStakedReducer } from './fetchCurrentlyStaked';


const reducers = [
  fetchPoolsInfoReducer,
  checkApprovalReducer,
  fetchBalanceReducer,
  fetchCurrentlyStakedReducer
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