import React, { useState, useCallback } from 'react';

import useFilteredPools from '../../hooks/useFilteredPools';
import useSortedPools from '../../hooks/useSortedPools';
import usePoolsByAsset from '../../hooks/usePoolsByAsset';

import Pool from '../Pool/Pool';
import Filters from '../Filters/Filters';

const VisiblePools = ({ pools, tokens, apys }) => {
  const { filteredPools, toggleFilter, filters } = useFilteredPools(pools, tokens);
  const { sortedPools, order, setOrder } = useSortedPools(filteredPools, apys);
  const { poolsByAsset, asset, setAsset } = usePoolsByAsset(sortedPools);

  const [openedCardList, setOpenCardList] = useState([0]);

  const toggleCard = useCallback(
    id => {
      return setOpenCardList(openedCardList => {
        if (openedCardList.includes(id)) {
          return openedCardList.filter(item => item !== id);
        } else {
          return [...openedCardList, id];
        }
      });
    },
    [openedCardList]
  );

  return (
    <>
      <Filters
        toggleFilter={toggleFilter}
        filters={filters}
        order={order}
        setOrder={setOrder}
        asset={asset}
        setAsset={setAsset}
      />
      {poolsByAsset.map((pool, index) => (
        <Pool
          pool={pool}
          index={index}
          isOpen={openedCardList.includes(index)}
          toggleCard={toggleCard}
          tokens={tokens}
          contractApy={apys}
          key={index}
        />
      ))}
    </>
  );
};

export default VisiblePools;
