import { useState, useEffect } from 'react';

const usePoolsByPlatform = pools => {
  const [platform, setPlatform] = useState('All');
  const [poolsByPlatform, setPoolsByPlatform] = useState(pools);

  useEffect(() => {
    if (platform === 'All') {
      setPoolsByPlatform(pools);
    } else {
      let newPools = pools.filter(pool => pool.platform === platform);
      setPoolsByPlatform(newPools);
    }
  }, [pools, platform]);

  return { poolsByPlatform, platform, setPlatform };
};

export default usePoolsByPlatform;
