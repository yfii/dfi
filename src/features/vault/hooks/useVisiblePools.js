import { useState } from 'react';

const useVisiblePools = (pools, chunk) => {
  const [visibleCount, setVisibleCount] = useState(chunk);

  let visiblePools = pools.slice(0, visibleCount);

  const fetchVisiblePools = () => {
    if (visibleCount >= pools.length) return;

    // Concat visible pools with new chunk
    const newPools = pools.slice(visibleCount, visibleCount + chunk);
    visiblePools = visiblePools.concat(newPools);
    setVisibleCount(visibleCount + chunk);
  };

  return { visiblePools, fetchVisiblePools };
};

export default useVisiblePools;
