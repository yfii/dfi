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
      case 'tvl':
        setSortedPools(handleTvl(pools));
        break;
    }
  }, [pools, apys, order]);

  return sortedPools;
};

const handleApy = (pools, apys) => {
  let newPools = [...pools];
  return newPools.sort((a, b) => {
    return apys[b.id] - apys[a.id];
  });
};

const handleTvl = pools => {
  let newPools = [...pools];
  return newPools.sort((a, b) => {
    return b.tvl - a.tvl;
  });
};

export default useSortedPools;
