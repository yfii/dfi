import { launchpools } from '../../helpers/getNetworkData';

const now = Date.now() / 1000;

export const initialFetchState = {
  fetchApprovalPending: Object.fromEntries(
    Object.values(launchpools).map(pool => [pool.id, false])
  ),
  fetchStakePending: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, false])),
  fetchWithdrawPending: Object.fromEntries(
    Object.values(launchpools).map(pool => [pool.id, false])
  ),
  fetchClaimPending: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, false])),
  fetchExitPending: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, false])),
};

export const initialUserState = {
  userApproval: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, '0'])),
  userBalance: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, '0'])),
  userStaked: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, '0'])),
  userRewardsAvailable: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, '0'])),
};

export const initialPoolState = {
  poolStatus: Object.fromEntries(
    Object.values(launchpools).map(pool => [
      pool.id,
      pool.fixedStatus !== true && pool.status === 'active' && now >= pool.periodFinish
        ? 'closed'
        : pool.status,
    ])
  ),
  poolFinish: Object.fromEntries(
    Object.values(launchpools).map(pool => [pool.id, pool.periodFinish])
  ),
  poolStaked: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, '0'])),
  poolApr: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, 0])),
};

const initialState = {
  subscriptions: Object.fromEntries(Object.values(launchpools).map(pool => [pool.id, {}])),
  ...initialPoolState,
  ...initialUserState,
  ...initialFetchState,
};

export default initialState;
