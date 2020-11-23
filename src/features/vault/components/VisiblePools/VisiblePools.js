import React, { useState } from 'react';

import useFilteredPools from '../../hooks/useFilteredPools';
import useSortedPools from '../../hooks/useSortedPools';
import Pool from '../Pool/Pool';

const VisiblePools = ({ pools, tokens, apys }) => {
  const { filteredPools, toggleFilter, filters } = useFilteredPools(pools, tokens);
  const { sortedPools, setOrder } = useSortedPools(filteredPools, apys);
  const [openedCardList, setOpenCardList] = useState([0]);

  const openCard = id => {
    return setOpenCardList(openedCardList => {
      if (openedCardList.includes(id)) {
        return openedCardList.filter(item => item !== id);
      } else {
        return [...openedCardList, id];
      }
    });
  };

  return (
    <>
      <button onClick={() => toggleFilter('hideDecomissioned')}>Hide Decomissioned</button>
      <button onClick={() => toggleFilter('hideZeroBalances')}>Hide Zero</button>
      <button onClick={() => setOrder('apy')}>APY</button>
      <button onClick={() => setOrder('tvl')}>TVL</button>

      {sortedPools.map((pool, index) => (
        <Pool
          pool={pool}
          index={index}
          openedCardList={openedCardList}
          openCard={openCard}
          tokens={tokens}
          contractApy={apys}
          key={index}
        />
      ))}
    </>
  );
};

export default VisiblePools;
