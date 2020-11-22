import { useState, useEffect } from 'react';

const useSortedPools = (pools, apys, order) => {
  const [sortedPools, setSortedPools] = useState(pools);
  console.log('useSorted being called.');

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
  console.time('sort');
  let sorted = pools.sort((a, b) => {
    return apys[b.id] - apys[a.id];
  });
  console.timeEnd('sort');
  return sorted;
};

export default useSortedPools;
