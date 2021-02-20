import { useState, useEffect } from 'react';

const useVisiblePools = (pools, chunk) => {
  const [ visiblePools, setVisiblePools ] = useState([]);

  useEffect(() => {
    setVisiblePools(pools.slice(0, chunk));
  }, [pools, chunk]);

  const fetchVisiblePools = () => {
    const poolCount    = pools.length;
    const visibleCount = visiblePools.length;

    if(visibleCount >= poolCount) return;

    // Concat visible pools with new chunk
    const newPools = pools.slice(visibleCount, visibleCount + chunk);
    setVisiblePools(visiblePools.concat(newPools));
  };

  return { visiblePools, fetchVisiblePools };
};

export default useVisiblePools;
