import { useState, useEffect } from 'react';

const useSortedPools = (pools, apys, order) => {
  const [sortedPools, setSortedPools] = useState(pools);

  useEffect(() => {
    switch (order) {
      case 'default':
        setSortedPools(pools);
        break;
      case 'apy':
        setSortedPools(handleApy(pools, apys));
        break;
    }
  }, [pools, apys, order]);

  return sortedPools;
};

const handleApy = (pools, apys) => {
  return pools.sort((a, b) => {
    return apys[b.id] - apys[a.id];
  });
};

export default useSortedPools;
