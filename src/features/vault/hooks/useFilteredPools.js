import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = {
  hideDecomissioned: true,
  hideZeroBalances: false,
  hideZeroVaultBalances: false,
  showBoosted: false,
  showExperimental: false,
};

const KEY = 'filteredPools';

const useFilteredPools = (pools, tokens) => {
  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [filters, setFilters] = useState(data ? data : DEFAULT);

  const toggleFilter = key => {
    const newFilters = { ...filters };
    newFilters[key] = !filters[key];
    setFilters(newFilters);
  };

  useEffect(() => {
    setStorage(KEY, filters);
  }, [setStorage, filters]);

  let filteredPools = [...pools];

  if (filters.resetAll) {
    setFilters(DEFAULT);
  }

  if (filters.hideZeroBalances) {
    filteredPools = hideZeroBalances(filteredPools, tokens);
  }

  if (filters.hideZeroVaultBalances) {
    filteredPools = hideZeroVaultBalances(filteredPools, tokens);
  }

  if (filters.hideDecomissioned) {
    filteredPools = hideDecomissioned(filteredPools, tokens);
  }

  if (filters.showBoosted) {
    filteredPools = showBoosted(filteredPools);
  }

  filteredPools = Experimental(filteredPools, filters.showExperimental);

  return { filteredPools, toggleFilter, filters };
};

function Experimental(pools, show) {
  return pools.filter(pool => {
    return show ? pool.experimental : !pool.experimental;
  });
}

function showBoosted(pools) {
  return pools.filter(pool => {
    return pool.launchpool;
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

function hideZeroBalances(pools, tokens) {
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

    return false;
  });
}

function hideZeroVaultBalances(pools, tokens) {
  return pools.filter(pool => {
    if (tokens[pool.earnedToken]) {
      if (tokens[pool.earnedToken].tokenBalance > 0) {
        return true;
      }
    }

    return false;
  });
}

export default useFilteredPools;
