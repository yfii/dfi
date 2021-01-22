import { reducer as snackbarReducer } from './snackbar';

const reducers = [snackbarReducer];

const initialState = {
  notifications: [],
};

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
