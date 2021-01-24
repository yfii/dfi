import React from 'react';

import useFilteredPools from '../../hooks/useFilteredPools';
import usePoolsByPlatform from '../../hooks/usePoolsByPlatform';
import usePoolsByVaultType from '../../hooks/usePoolsByVaultType';
import usePoolsByAsset from '../../hooks/usePoolsByAsset';
import useSortedPools from '../../hooks/useSortedPools';

import Pool from '../Pool/Pool';
import Filters from '../Filters/Filters';

const VisiblePools = ({ pools, tokens, apys }) => {
  const { filteredPools, toggleFilter, filters } = useFilteredPools(pools, tokens);
  const { poolsByPlatform, platform, setPlatform } = usePoolsByPlatform(filteredPools);
  const { poolsByVaultType, vaultType, setVaultType } = usePoolsByVaultType(poolsByPlatform);
  const { poolsByAsset, asset, setAsset } = usePoolsByAsset(poolsByVaultType);
  const { sortedPools, order, setOrder } = useSortedPools(poolsByAsset, apys);

  return (
    <>
      <Filters
        toggleFilter={toggleFilter}
        filters={filters}
        platform={platform}
        vaultType={vaultType}
        asset={asset}
        order={order}
        setPlatform={setPlatform}
        setVaultType={setVaultType}
        setAsset={setAsset}
        setOrder={setOrder}
      />
      {sortedPools.map((pool, index) => (
        <Pool pool={pool} index={index} tokens={tokens} apy={apys[pool.id] || 0} key={pool.id} />
      ))}
    </>
  );
};

export default VisiblePools;
