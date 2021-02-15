import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = {
  hideDecomissioned: true,
  hideZeroBalances: false,
  hideZeroVaultBalances: false,
};

const KEY = 'filteredPools';

const useFilteredPools = (pools, tokens) => {
  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [filteredPools, setFilteredPools] = useState(pools);
  const [filters, setFilters] = useState(data ? data : DEFAULT);

  const toggleFilter = key => {
    const newFilters = { ...filters };
    newFilters[key] = !filters[key];
    setFilters(newFilters);
  };

  useEffect(() => {
    setStorage(KEY, filters);
  }, [setStorage, filters]);

  useEffect(() => {
    let newPools = [...pools];

    if (filters.hideZeroBalances) {
      newPools = hideZeroBalances(newPools, tokens);
    }

    if (filters.hideZeroVaultBalances) {
      newPools = hideZeroVaultBalances(newPools, tokens);
    }

    // Show all vaults to new users
    if (newPools.length === 0) {
      newPools = [...pools];
    }

    if (filters.hideDecomissioned) {
      newPools = hideDecomissioned(newPools);
    }

    setFilteredPools(newPools);
  }, [pools, tokens, filters]);

  return { filteredPools, toggleFilter, filters };
};

function hideDecomissioned(pools) {
  return pools.filter(pool => {
    return pool.status !== 'eol' && pool.status !== 'refund';
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
