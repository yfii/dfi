import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = 'All';
const KEY = 'poolsByPlatform';

const usePoolsByPlatform = pools => {
  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [platform, setPlatform] = useState(data ? data : DEFAULT);

  useEffect(() => {
    setStorage(KEY, platform);
  }, [setStorage, platform]);

  let poolsByPlatform = pools;
  if (platform !== DEFAULT) {
    const newPools = pools.filter(pool => pool.platform === platform);
    poolsByPlatform = newPools;
  }

  return { poolsByPlatform, platform, setPlatform };
};

export default usePoolsByPlatform;
