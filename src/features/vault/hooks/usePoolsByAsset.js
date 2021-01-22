import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = 'All';
const KEY = 'poolsByAsset';

const usePoolsByAsset = pools => {
  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [asset, setAsset] = useState(data ? data : DEFAULT);
  const [poolsByAsset, setPoolsByAsset] = useState(pools);

  useEffect(() => {
    setStorage(KEY, asset);
  }, [setStorage, asset]);

  useEffect(() => {
    if (asset === DEFAULT) {
      setPoolsByAsset(pools);
    } else {
      const newPools = pools.filter(pool => pool.assets.includes(asset));
      setPoolsByAsset(newPools);
    }
  }, [pools, asset]);

  return { poolsByAsset, asset, setAsset };
};

export default usePoolsByAsset;
