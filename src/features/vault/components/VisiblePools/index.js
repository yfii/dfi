import React, { useState } from 'react';

import useFilteredPools from '../../hooks/useFilteredPools';
import useSortedPools from '../../hooks/useSortedPools';
import Pool from '../Pool';

const VisiblePools = ({ pools, tokens, apys }) => {
  const [order, setOrder] = useState('default');
  const sortedPools = useSortedPools(pools, apys, order);

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
      <button onClick={() => setOrder('default')}>Default</button>
      <button onClick={() => setOrder('apy')}>APY</button>

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
