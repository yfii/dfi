import { useState, useEffect } from 'react';

const usePoolsByAsset = pools => {
  const [asset, setAsset] = useState('All');
  const [poolsByAsset, setPoolsByAsset] = useState(pools);

  useEffect(() => {
    if (asset === 'All') {
      setPoolsByAsset(pools);
    } else {
      let newPools = pools.filter(pool => pool.assets.includes(asset));
      setPoolsByAsset(newPools);
    }
  }, [pools, asset]);

  return { poolsByAsset, asset, setAsset };
};

export default usePoolsByAsset;
