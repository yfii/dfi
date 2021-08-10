import { launchpools, vaults } from '../../helpers/getNetworkData';
import { VAULT_UPDATE_LAUNCHPOOLS } from './constants';

export async function updateLaunchpools(dispatch, getState) {
  const {
    stake: { poolStatus, poolApr },
  } = getState();

  const allActive = Object.fromEntries(
    Object.entries(vaults).map(([vaultId, vault]) => {
      const activeLaunchpools = Object.values(launchpools)
        .filter(pool => pool.token === vault.earnedToken && poolStatus[pool.id] !== 'closed')
        .map(pool => pool.id);

      activeLaunchpools.sort((a, b) => {
        const apyA = poolApr[a];
        const apyB = poolApr[b];

        // Descending sort
        return (apyB > apyA) - (apyA > apyB);
      });

      return [vaultId, activeLaunchpools];
    })
  );

  const highestApy = Object.fromEntries(
    Object.keys(vaults).map(vaultId => {
      return [vaultId, allActive[vaultId].length ? allActive[vaultId][0] : null];
    })
  );

  dispatch({
    type: VAULT_UPDATE_LAUNCHPOOLS,
    vaultLaunchpools: allActive,
    vaultLaunchpool: highestApy,
  });
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_UPDATE_LAUNCHPOOLS: {
      return {
        ...state,
        vaultLaunchpools: {
          ...state.vaultLaunchpools,
          ...action.vaultLaunchpools,
        },
        vaultLaunchpool: {
          ...state.vaultLaunchpool,
          ...action.vaultLaunchpool,
        },
      };
    }
    default: {
      return state;
    }
  }
}
