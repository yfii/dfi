import { launchpools, vaults } from '../../helpers/getNetworkData';

export function vaultLaunchpoolsReducer(state, action) {
  // Listen in on launchpool status updates
  if (action.type === 'launchpools/subscription/poolStatus') {
    // Get all vaults that currently point to this launchpool (payload.id) and update them
    const updateEntries = Object.entries(state.vaultLaunchpools)
      .filter(([, currentPoolId]) => currentPoolId === action.payload.id)
      .map(([vaultId, currentPoolId]) => {
        const vault = vaults[vaultId];
        const newPool = Object.values(launchpools).find(
          lp => lp.token === vault.earnedToken && action.payload.poolStatus !== 'closed'
        );
        const newPoolId = newPool ? newPool.id : null;
        return newPoolId !== currentPoolId ? [vault.id, newPoolId] : null;
      })
      .filter(entry => !!entry);

    if (updateEntries.length) {
      const updates = Object.fromEntries(updateEntries);
      return {
        ...state,
        vaultLaunchpools: {
          ...state.vaultLaunchpools,
          ...updates,
        },
      };
    }
  }

  return state;
}
