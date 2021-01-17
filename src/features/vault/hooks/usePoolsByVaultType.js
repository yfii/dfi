import { useState, useEffect } from 'react';
import { stables } from '../components/Filters/constants.js';

const usePoolsByVaultType = pools => {
  const [vaultType, setVaultType] = useState('All');
  const [poolsByVaultType, setPoolsByVaultType] = useState(pools);

  useEffect(() => {
    if (vaultType === 'All') {
      setPoolsByVaultType(pools);
    } else if (vaultType === 'Singles') {
      let newPools = pools.filter(pool => pool.assets.length === 1);
      setPoolsByVaultType(newPools);
    } else if (vaultType === 'StableLPs') {
      const isStable = (vaultType) => stables.includes(vaultType);
      let newPools = pools.filter(pool => pool.assets.every(isStable));
      setPoolsByVaultType(newPools);
    } else if (vaultType === 'Stables') {
      const isStable = (vaultType) => stables.includes(vaultType);
      let newPools = pools.filter(pool => pool.assets.some(isStable));
      setPoolsByVaultType(newPools);
    }
  }, [pools, vaultType]);

  return { poolsByVaultType, vaultType, setVaultType };
};

export default usePoolsByVaultType;
