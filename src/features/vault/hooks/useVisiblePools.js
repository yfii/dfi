import { useState, useEffect } from 'react';

const useVisiblePools = (pools, chunk) => {
  const [ visiblePools, setVisiblePools ] = useState([]);

  useEffect(() => {
    // Attempt to load as many pools as there were already loaded
    // this should stop the window jumping to the top when pools
    // are updated.
    setVisiblePools((previousVisiblePools) => (
      pools.slice(0, Math.max(previousVisiblePools.length, chunk))
    ));
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
