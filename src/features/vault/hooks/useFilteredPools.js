import { useState, useEffect } from 'react';

const useFilteredPools = (pools, tokens, filter) => {
  const [filteredPoools, setFilteredPools] = useState(pools);

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredPools(pools);
        break;
      case 'hasBalance':
        setFilteredPools(handleHasBalance(pools, tokens));
        break;
      case 'hasShares':
        setFilteredPools(handleHasShares(pools, tokens));
        break;
    }
  }, [pools, tokens, filter]);

  return filteredPoools;
};

const handleHasBalance = (pools, tokens) => {
  return pools.filter(pool => {
    if (tokens[pool.name] !== undefined) {
      return tokens[pool.name].tokenBalance !== 0;
    }
    return false;
  });
};

const handleHasShares = (pools, tokens) => {
  return pools.filter(pool => {
    if (tokens[pool.earnedToken] !== undefined) {
      return tokens[pool.earnedToken].tokenBalance !== 0;
    }
    return false;
  });
};

export default useFilteredPools;
