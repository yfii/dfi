import { useState, useEffect } from 'react';
import { stables } from '../components/Filters/constants.js';

const usePoolsByAsset = pools => {
  const [asset, setAsset] = useState('All');
  const [poolsByAsset, setPoolsByAsset] = useState(pools);

  useEffect(() => {
    if (asset === 'All') {
      setPoolsByAsset(pools);
    } else if (asset === 'Singles') {
      let newPools = pools.filter(pool => pool.assets.length === 1);
      setPoolsByAsset(newPools);
    } else if (asset === 'StableLPs') {
      const isStable = (asset) => stables.includes(asset);
      let newPools = pools.filter(pool => pool.assets.every(isStable));
      setPoolsByAsset(newPools);
    } else if (asset === 'Stables') {
      const isStable = (asset) => stables.includes(asset);
      let newPools = pools.filter(pool => pool.assets.some(isStable));
      setPoolsByAsset(newPools);
    } else {
      let newPools = pools.filter(pool => pool.assets.includes(asset));
      setPoolsByAsset(newPools);
    }
  }, [pools, asset]);

  return { poolsByAsset, asset, setAsset };
};

export default usePoolsByAsset;
