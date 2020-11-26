import { useState, useEffect } from 'react';

const initialFilters = {
  showDecomissioned: {
    active: false,
    filter: showDecomissioned,
  },
  showZeroBalances: {
    active: true,
    filter: showZeroBalances,
  }
};

const useFilteredPools = (pools, tokens) => {
  const [filteredPools, setFilteredPools] = useState(pools);
  const [filters, setFilters] = useState(initialFilters);

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

function showDecomissioned(pools) {
  return pools.filter(pool => {
    return pool.status === 'eol' && pool.status === 'refund';
  });
}

function showZeroBalances(pools, tokens) {
  return pools.filter(pool => {
    console.log(tokens[pool.name]);

    if (tokens[pool.name] !== undefined) {
      if (tokens[pool.name].tokenBalance > 0) return true;
    }
    if (tokens[pool.earnedToken] !== undefined) {
      if (tokens[pool.earnedToken].tokenBalance > 0) return true;
    }
    return false;
  });
}

export default useFilteredPools;
