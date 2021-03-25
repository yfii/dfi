import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';

import TVLLoader from './TVLLoader/TVLLoader';
import NetworksToggle from 'components/NetworksToggle/NetworksToggle';
import { useConnectWallet } from 'features/home/redux/hooks';
import { useFetchBalances, useFetchVaultsData, useFetchApys } from '../../redux/hooks';
import VisiblePools from '../VisiblePools/VisiblePools';
import styles from './styles';
import usePoolsTvl from '../../hooks/usePoolsTvl';
import { formatGlobalTvl } from 'features/helpers/format';
import { useFetchPoolsInfo } from 'features/stake/redux/fetchPoolsInfo';
import { byDecimals } from 'features/helpers/bignumber';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

export default function Pools() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataDone } = useFetchVaultsData();
  const { poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();
  const { tokens, fetchBalances, fetchBalancesDone } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const { poolsTvl } = usePoolsTvl(pools);
  const classes = useStyles();

  let myTvl = 0;
  pools.forEach(pool => {
    const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
    if (sharesBalance > 0) {
      const deposited = byDecimals(
        sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
        pool.tokenDecimals
      );
      myTvl += deposited * pool.oraclePrice;
    }
  });

  useEffect(() => {
    fetchPoolsInfo();
  }, [fetchPoolsInfo]);

  useEffect(() => {
    const fetch = () => {
      fetchApys();
    };
    fetch();
    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [fetchApys]);

  useEffect(() => {
    const fetch = () => {
      if (address && web3) {
        fetchBalances({ address, web3, tokens });
      }
      fetchVaultsData({ address, web3, pools });
    };
    fetch();

    const id = setInterval(fetch, FETCH_INTERVAL_MS);
    return () => clearInterval(id);

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchVaultsData]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6}>
        <h1 className={classes.title}>{t('Vault-Network')}</h1>
        <NetworksToggle />
      </Grid>
      <Grid item xs={6}>
        <div className={classes.tvl}>
          <span className={classes.title}>
            TVL{' '}
            {fetchVaultsDataDone && poolsTvl > 0 ? (
              formatGlobalTvl(poolsTvl)
            ) : (
              <TVLLoader className={classes.titleLoader} />
            )}
          </span>

          <span className={classes.text}>
            {t('Vault-Deposited')}{' '}
            {fetchVaultsDataDone && fetchBalancesDone ? (
              formatGlobalTvl(myTvl)
            ) : (
              <TVLLoader className={classes.titleLoader} />
            )}
          </span>
          <h3 className={classes.subtitle} style={{ marginTop: '24px' }}>
            {t('Vault-WithdrawFee')}
          </h3>
        </div>
      </Grid>

      <VisiblePools
        pools={pools}
        poolsInfo={poolsInfo}
        apys={apys}
        tokens={tokens}
        fetchBalancesDone={fetchBalancesDone}
        fetchApysDone={fetchApysDone}
        fetchVaultsDataDone={fetchVaultsDataDone}
      />
    </Grid>
  );
}
