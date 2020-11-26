import { useState, useEffect } from 'react';

const initialFilters = {
  hideDecomissioned: true,
  hideZeroBalances: true
};

const useFilteredPools = (pools, tokens) => {
  const [filteredPools, setFilteredPools] = useState(pools);
  const [filters, setFilters] = useState(initialFilters);

  const toggleFilter = key => {
    let newFilters = {...filters}
    newFilters[key] = !filters[key]
    setFilters(newFilters);
  };

  useEffect(() => {
    let newPools = [...pools];

    if (filters.hideZeroBalances) { 
      newPools = hideZeroBalances(newPools, tokens);
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
      if (tokens[pool.token].tokenBalance > 1e10) { return true; }
    }

    if(tokens[pool.earnedToken]) {
      if (tokens[pool.earnedToken].tokenBalance > 1e10) { return true; }
    }

    return false;
  });
}

export default useFilteredPools;
