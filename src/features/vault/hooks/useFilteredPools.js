import { useState, useEffect } from 'react';

const initialFilters = {
  hideDecomissioned: {
    active: false,
    filter: hideDecomissioned,
  },
  hideZeroBalances: {
    active: false,
    filter: hideZeroBalances,
  },
  hidePancake: {
    active: false,
    filter: (pools, tokens) => hidePlatform(pools, tokens, 'pancake'),
  },
  hideThugs: {
    active: false,
    filter: (pools, tokens) => hidePlatform(pools, tokens, 'thugs'),
  },
  hideFortube: {
    active: false,
    filter: (pools, tokens) => hidePlatform(pools, tokens, 'fortube'),
  },
  hideFry: {
    active: false,
    filter: (pools, tokens) => hidePlatform(pools, tokens, 'fry'),
  },
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

function hideDecomissioned(pools) {
  return pools.filter(pool => {
    return pool.status !== 'eol' && pool.status !== 'refund';
  });
}

function hideZeroBalances(pools, tokens) {
  return pools.filter(pool => {
    if (tokens[pool.name] !== undefined) {
      if (tokens[pool.name].tokenBalance > 0) return true;
    }
    if (tokens[pool.earnedToken] !== undefined) {
      if (tokens[pool.earnedToken].tokenBalance > 0) return true;
    }
    return false;
  });
}

function hidePlatform(pools, _, platform) {
  return pools.filter(pool => pool.platform !== platform);
}

export default useFilteredPools;
