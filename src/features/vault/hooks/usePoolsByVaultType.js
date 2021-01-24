import { useState, useEffect } from 'react';
import { stables } from '../components/Filters/constants.js';
import useFilterStorage from '../../home/hooks/useFiltersStorage';

const DEFAULT = 'All';
const KEY = 'poolsByVaultType';

const usePoolsByVaultType = pools => {
  const { getStorage, setStorage } = useFilterStorage();
  const data = getStorage(KEY);

  const [vaultType, setVaultType] = useState(data ? data : DEFAULT);
  const [poolsByVaultType, setPoolsByVaultType] = useState(pools);

  useEffect(() => {
    setStorage(KEY, vaultType);
  }, [setStorage, vaultType])

  useEffect(() => {
    let newPools;

    if (vaultType === 'Singles') {
      newPools = pools.filter(pool => pool.assets.length === 1);
    } else {
      const isStable = (vaultType) => stables.includes(vaultType);
      if (vaultType === 'StableLPs') {
        newPools = pools.filter(pool => pool.assets.every(isStable)); // every
      } else if (vaultType === 'Stables') {
        newPools = pools.filter(pool => pool.assets.some(isStable)); // some
      }
    }

    if (newPools && newPools.length) {
      setPoolsByVaultType(newPools);
    } else {
      setPoolsByVaultType(pools);
    }
  }, [pools, vaultType, setPoolsByVaultType]);

  return { poolsByVaultType, vaultType, setVaultType };
};

export default usePoolsByVaultType;
