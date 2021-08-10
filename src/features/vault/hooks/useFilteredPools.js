import { useState, useEffect, useCallback, useMemo } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';
import { shallowEqual, useSelector } from 'react-redux';
import { useLaunchpoolSubscriptions } from '../../stake/redux/subscription';
import { launchpools } from '../../helpers/getNetworkData';

const DEFAULT = {
  hideDecomissioned: true,
  hideZeroBalances: false,
  hideZeroVaultBalances: false,
  showBoosted: false,
  showExperimental: false,
};

const KEY = 'filteredPools';

function useRecentStakedLaunchpools(maxAgeDays = 30) {
  const { subscribe } = useLaunchpoolSubscriptions();
  const poolFinish = useSelector(state => state.stake.poolFinish, shallowEqual);
  const userStaked = useSelector(state => state.stake.userStaked, shallowEqual);

  const recentLaunchpools = useMemo(() => {
    const nowMinusDays = Date.now() / 1000 - 86400 * maxAgeDays;
    return Object.values(launchpools).filter(
      lp => poolFinish[lp.id] && poolFinish[lp.id] > nowMinusDays
    );
  }, [poolFinish, maxAgeDays]);

  useEffect(() => {
    const unsubscribes = recentLaunchpools.map(launchpool =>
      subscribe(launchpool.id, {
        userStaked: true,
      })
    );

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [subscribe, recentLaunchpools]);

  return useMemo(() => {
    return recentLaunchpools.filter(lp => userStaked[lp.id] && userStaked[lp.id] !== '0');
  }, [recentLaunchpools, userStaked]);
}

function getLaunchpoolsForVault(vault, launchpools) {
  return Object.values(launchpools).filter(lp => lp.tokenAddress === vault.earnedTokenAddress);
}

const useFilteredPools = (pools, tokens) => {
  const { getStorage, setStorage } = useFilterStorage();
  const vaultLaunchpools = useSelector(state => state.vault.vaultLaunchpool);
  const recentStakedLaunchpools = useRecentStakedLaunchpools();
  const data = getStorage(KEY);
  const [filters, setFilters] = useState(data ? data : DEFAULT);

  const toggleFilter = useCallback(
    key => {
      const newFilters = { ...filters };
      newFilters[key] = !filters[key];
      setFilters(newFilters);
    },
    [filters, setFilters]
  );

  useEffect(() => {
    setStorage(KEY, filters);
  }, [setStorage, filters]);

  let filteredPools = [...pools];

  if (filters.resetAll) {
    setFilters(DEFAULT);
  }

  if (filters.hideZeroBalances) {
    filteredPools = hideZeroBalances(filteredPools, tokens, recentStakedLaunchpools);
  }

  if (filters.hideZeroVaultBalances) {
    filteredPools = hideZeroVaultBalances(filteredPools, tokens, recentStakedLaunchpools);
  }

  if (filters.hideDecomissioned) {
    filteredPools = hideDecomissioned(filteredPools, tokens);
  }

  if (filters.showBoosted) {
    filteredPools = showBoosted(filteredPools, vaultLaunchpools);
  }

  filteredPools = Experimental(filteredPools, filters.showExperimental);

  return { filteredPools, toggleFilter, filters };
};

function Experimental(pools, show) {
  return pools.filter(pool => {
    return show ? pool.experimental : !pool.experimental;
  });
}

function showBoosted(pools, vaultLaunchpools) {
  return pools.filter(pool => {
    return !!vaultLaunchpools[pool.id];
  });
}

function hideDecomissioned(pools, tokens) {
  return pools.filter(pool => {
    return (
      (pool.status !== 'eol' && pool.status !== 'refund') ||
      (tokens[pool.earnedToken] && tokens[pool.earnedToken].tokenBalance > 0)
    );
  });
}

function hideZeroBalances(pools, tokens, recentStakedLaunchpools) {
  return pools.filter(pool => {
    if (tokens[pool.token]) {
      if (tokens[pool.token].tokenBalance > 0) {
        return true;
      }
    }

    if (tokens[pool.earnedToken]) {
      if (tokens[pool.earnedToken].tokenBalance > 0) {
        return true;
      }
    }

    const launchpools = getLaunchpoolsForVault(pool, recentStakedLaunchpools);
    if (launchpools.length) {
      return true;
    }

    return false;
  });
}

function hideZeroVaultBalances(pools, tokens, recentStakedLaunchpools) {
  return pools.filter(pool => {
    if (tokens[pool.earnedToken]) {
      if (tokens[pool.earnedToken].tokenBalance > 0) {
        return true;
      }
    }

    const launchpools = getLaunchpoolsForVault(pool, recentStakedLaunchpools);
    if (launchpools.length) {
      return true;
    }

    return false;
  });
}

export default useFilteredPools;
