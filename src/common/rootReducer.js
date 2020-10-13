import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import history from './history';
import homeReducer from 'features/home/redux/reducer';
import vaultReducer from 'features/vault/redux/reducer';
import stakeReducer from 'features/stake/redux/reducer';
import farmReducer from 'features/farm/redux/reducer';
import swapReducer from 'features/swap/redux/reducer';
import liquidityReducer from 'features/liquidity/redux/reducer';
import commonReducer from 'features/common/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter(history),
  home: homeReducer,
  vault: vaultReducer,
  stake: stakeReducer,
  farm: farmReducer,
  swap: swapReducer,
  liquidity: liquidityReducer,
  common: commonReducer,
};

export default combineReducers(reducerMap);
