import { useState, useEffect } from 'react';

const useMultiFilter = (pools, tokens) => {
  const [filteredPools, setFilteredPools] = useState(pools);
  const [filters, setFilters] = useState({
    hideDecomissioned: {
      active: false,
      filter: hideDecomissioned,
    },
    hideZeroBalances: {
      active: false,
      filter: hideZeroBalances,
    },
  });

  const toggleFilter = key => {
    setFilters({
      ...filters,
      [key]: {
        ...filters[key],
        active: !filters[key].active,
      },
    });
  };

  useEffect(() => {
    let newPools = [...pools];

    for (const key in filters) {
      if (filters[key].active) {
        newPools = filters[key].filter(newPools, tokens);
      }
    }

    setFilteredPools(newPools);
  }, [pools, tokens, filters]);

  return { filteredPools, toggleFilter, filters };
};

const hideDecomissioned = pools => {
  return pools.filter(pool => {
    return pool.status !== 'eol' && pool.status !== 'refund';
  });
};

const hideZeroBalances = (pools, tokens) => {
  return pools.filter(pool => {
    if (tokens[pool.name] !== undefined) {
      if (tokens[pool.name].tokenBalance > 0) return true;
    }
    if (tokens[pool.earnedToken] !== undefined) {
      if (tokens[pool.earnedToken].tokenBalance > 0) return true;
    }
    return false;
  });
};

export default useMultiFilter;
