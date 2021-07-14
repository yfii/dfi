export function vaultLaunchpoolsReducer(state, action) {
  // Listen in on launchpool status updates
  if (
    action.type === 'launchpools/subscription/poolStatus' &&
    action.payload.poolStatus === 'closed'
  ) {
    // Get all vaults that currently point to this launchpool (payload.id) and update them
    const updateEntries = Object.entries(state.vaultLaunchpools)
      .filter(([, currentPoolId]) => currentPoolId === action.payload.id)
      .map(([vaultId]) => [vaultId, null]);

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
