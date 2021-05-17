import React, { useEffect } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';

import useFilteredPools from '../../hooks/useFilteredPools';
import usePoolsByPlatform from '../../hooks/usePoolsByPlatform';
import usePoolsByVaultType from '../../hooks/usePoolsByVaultType';
import usePoolsByAsset from '../../hooks/usePoolsByAsset';
import useSortedPools from '../../hooks/useSortedPools';
import useVisiblePools from '../../hooks/useVisiblePools';

import Pool from '../Pool/Pool';
import Filters from '../Filters/Filters';
import { useFetchPoolData } from '../../../stake/redux/fetchPoolData';

const useStyles = makeStyles(styles);

const VisiblePools = ({
  pools,
  tokens,
  apys,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { filteredPools, toggleFilter, filters } = useFilteredPools(pools, tokens);
  const { poolsByPlatform, platform, setPlatform } = usePoolsByPlatform(filteredPools);
  const { poolsByVaultType, vaultType, setVaultType } = usePoolsByVaultType(poolsByPlatform);
  const { poolsByAsset, asset, setAsset } = usePoolsByAsset(poolsByVaultType);
  const { sortedPools, order, setOrder } = useSortedPools(poolsByAsset, apys, tokens);
  const { visiblePools, fetchVisiblePools } = useVisiblePools(sortedPools, 10);
  const { pools: stake, fetchPoolData } = useFetchPoolData();
  const indexes = [];

  useEffect(() => {
    const timestamp = Math.floor(Date.now() / 1000);
    for (let index in stake) {
      if (stake[index].periodFinish >= timestamp) {
        for (let key in pools) {
          if (stake[index].token === pools[key].earnedToken) {
            pools[key].launchpool = stake[index].id;
            if (!indexes.includes(index)) {
              indexes.push(index);
            }
            continue;
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    fetchPoolData(indexes);
  }, [fetchPoolData]);

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
      <div className={classes.scroller}>
        <InfiniteScroll dataLength={visiblePools.length} hasMore={true} next={fetchVisiblePools}>
          {visiblePools.map((pool, index) => (
            <Pool
              pool={pool}
              index={index}
              tokens={tokens}
              apy={apys[pool.id] || 0}
              key={pool.id}
              fetchBalancesDone={fetchBalancesDone}
              fetchApysDone={fetchApysDone}
              fetchVaultsDataDone={fetchVaultsDataDone}
            />
          ))}
        </InfiniteScroll>
      </div>
      {!sortedPools.length && <h3 className={classes.subtitle}>{t('No-Results')}</h3>}
    </>
  );
};

export default VisiblePools;
