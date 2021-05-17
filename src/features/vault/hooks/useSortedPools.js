import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = 'default';
const KEY = 'sortedPools';

const useSortedPools = (pools, apys, tokens) => {
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

  sortedPools = showDecommissionedFirst(sortedPools, tokens);

  return { sortedPools, order, setOrder };
};

const handleApy = (pools, apys) => {
  const newPools = [...pools];
  return newPools.sort((a, b) => {
    if (apys[a.id] === undefined) {
      return 1;
    } else if (apys[b.id] === undefined) {
      return -1;
    }

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

function showDecommissionedFirst(pools, tokens) {
  for (let i = 0; i < pools.length; i++) {
    // if ( EOL or REFUND ) AND (Deposited Balance > 0)
    if (
      (pools[i].status === 'eol' || pools[i].status === 'refund') &&
      tokens[pools[i].earnedToken] &&
      tokens[pools[i].earnedToken].tokenBalance > 0
    ) {
      // Remove Vault from pools, insert it at the top.
      pools.splice(0, 0, pools.splice(i, 1)[0]);
    }
  }
  return pools;
}

export default useSortedPools;
