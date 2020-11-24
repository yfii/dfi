import React, { useState } from 'react';

import useFilteredPools from '../../hooks/useFilteredPools';
import useSortedPools from '../../hooks/useSortedPools';
import usePoolsByAsset from '../../hooks/usePoolsByAsset';

import Pool from '../Pool/Pool';

const VisiblePools = ({ pools, tokens, apys }) => {
  const { filteredPools, toggleFilter } = useFilteredPools(pools, tokens);
  const { sortedPools, setOrder } = useSortedPools(filteredPools, apys);
  const { poolsByAsset, setAsset } = usePoolsByAsset(sortedPools);

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

      <button onClick={() => toggleFilter('hidePancake')}>Hide Pancake</button>
      <button onClick={() => toggleFilter('hideFortube')}>Hide Fortube</button>
      <button onClick={() => toggleFilter('hideThugs')}>Hide Thugs</button>
      <button onClick={() => toggleFilter('hideFry')}>Hide Fries</button>

      <button onClick={() => setOrder('default')}>Default</button>
      <button onClick={() => setOrder('apy')}>APY</button>
      <button onClick={() => setOrder('tvl')}>TVL</button>

      <button onClick={() => setAsset('DRUGS')}>DRUGS</button>
      <button onClick={() => setAsset('BTC')}>BTC</button>
      <button onClick={() => setAsset('CAKE')}>CAKE</button>

      {poolsByAsset.map((pool, index) => (
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
