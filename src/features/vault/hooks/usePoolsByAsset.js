import { useState, useEffect } from 'react';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = 'All';
const KEY = 'poolsByAsset';

const usePoolsByAsset = pools => {
  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [asset, setAsset] = useState(data ? data : DEFAULT);

  useEffect(() => {
    setStorage(KEY, asset);
  }, [setStorage, asset]);

  let poolsByAsset = pools;
  if (asset !== DEFAULT) {
    poolsByAsset = pools.filter(pool => pool.assets.includes(asset));
  }

  return { poolsByAsset, asset, setAsset };
};

export default usePoolsByAsset;
