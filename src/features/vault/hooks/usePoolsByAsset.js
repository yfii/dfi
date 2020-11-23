import { useState, useEffect } from 'react';

const usePoolsByAsset = pools => {
  const [asset, setAsset] = useState('all');
  const [poolsByAsset, setPoolsByAsset] = useState(pools);

  useEffect(() => {
    if (asset === 'all') {
      setPoolsByAsset(pools);
    } else {
      let newPools = pools.filter(pool => {
        return pool.assets.includes(asset);
      });

      setPoolsByAsset(newPools);
    }
  }, [pools, asset]);

  return { poolsByAsset, asset, setAsset };
};

export default usePoolsByAsset;
