import React from 'react';

import useFilteredPools from '../../hooks/useFilteredPools';
import usePoolsByPlatform from '../../hooks/usePoolsByPlatform';
import usePoolsByAsset from '../../hooks/usePoolsByAsset';
import useSortedPools from '../../hooks/useSortedPools';

import Pool from '../Pool/Pool';
import Filters from '../Filters/Filters';

const VisiblePools = ({ pools, tokens, apys }) => {
  const { filteredPools, toggleFilter, filters } = useFilteredPools(pools, tokens);
  const { poolsByPlatform, platform, setPlatform } = usePoolsByPlatform(filteredPools);
  const { poolsByAsset, asset, setAsset } = usePoolsByAsset(poolsByPlatform);
  const { sortedPools, order, setOrder } = useSortedPools(poolsByAsset, apys);

  return (
    <>
      <Filters
        toggleFilter={toggleFilter}
        filters={filters}
        platform={platform}
        asset={asset}
        order={order}
        setPlatform={setPlatform}
        setAsset={setAsset}
        setOrder={setOrder}
      />
      {sortedPools.map((pool, index) => (
        <Pool pool={pool} index={index} tokens={tokens} contractApy={apys} key={pool.id} />
      ))}
    </>
  );
};

export default VisiblePools;
