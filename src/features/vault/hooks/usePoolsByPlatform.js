import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = 'All';
const KEY = 'poolsByPlatform';

const usePoolsByPlatform = pools => {

  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [platform, setPlatform] = useState(data ? data : DEFAULT);
  const [poolsByPlatform, setPoolsByPlatform] = useState(pools);

  useEffect(() => {
    setStorage(KEY, platform);
  }, [setStorage, platform])

  useEffect(() => {
    if (platform === DEFAULT) {
      setPoolsByPlatform(pools);
    } else {
      const newPools = pools.filter(pool => pool.platform === platform);
      setPoolsByPlatform(newPools);
    }
  }, [pools, platform, setPlatform]);

  return { poolsByPlatform, platform, setPlatform };
};

export default usePoolsByPlatform;
