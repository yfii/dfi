import initialState from './initialState';
import { reducer as fetchPoolsInfoReducer} from './fetchPoolsInfo';
import { reducer as checkApprovalReducer} from './checkApproval';


const reducers = [
  fetchPoolsInfoReducer,
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