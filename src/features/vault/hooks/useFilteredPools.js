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

export default useFilteredPools;
