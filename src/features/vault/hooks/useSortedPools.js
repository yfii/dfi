import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = 'default';
const KEY = 'sortedPools';

const useSortedPools = (pools, apys) => {
  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [order, setOrder] = useState(data ? data : DEFAULT);

  useEffect(() => {
    setStorage(KEY, order);
  }, [setStorage, order]);

  let sortedPools = pools;
  switch (order) {
    case 'apy':
      sortedPools = handleApy(pools, apys);
      break;
    case 'tvl':
      sortedPools = handleTvl(pools);
      break;
    default:
      break;
  }

  return { sortedPools, order, setOrder };
};

const handleApy = (pools, apys) => {
  const newPools = [...pools];
  return newPools.sort((a, b) => {
    return apys[b.id] - apys[a.id];
  });
};

const handleTvl = pools => {
  const newPools = [...pools];
  return newPools.sort((a, b) => {
    const aPrice = a.oraclePrice;
    const bPrice = b.oraclePrice;
    return b.tvl * bPrice - a.tvl * aPrice;
  });
};

export default useSortedPools;
