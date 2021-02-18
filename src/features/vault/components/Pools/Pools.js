import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import TVLLoader from './TVLLoader/TVLLoader';
import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchBalances, useFetchVaultsData, useFetchApys } from '../../redux/hooks';
import VisiblePools from '../VisiblePools/VisiblePools';
import styles from './styles';
import usePoolsTvl from '../../hooks/usePoolsTvl';
import { formatGlobalTvl } from 'features/helpers/format';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

export default function Pools() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataLoaded } = useFetchVaultsData();
  const { tokens, fetchBalances } = useFetchBalances();
  const { apys, fetchApys } = useFetchApys();
  const { poolsTvl } = usePoolsTvl(pools);
  const classes = useStyles();

  useEffect(() => {
    if (address && web3) {
      fetchBalances({ address, web3, tokens });
      fetchVaultsData({ address, web3, pools });
      fetchApys();
      const id = setInterval(() => {
        fetchBalances({ address, web3, tokens });
        fetchVaultsData({ address, web3, pools });
        fetchApys();
      }, FETCH_INTERVAL_MS);
      return () => clearInterval(id);
    }

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchVaultsData]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <div className={classes.titles}>
          <h1 className={classes.title}>{t('Vault-MainTitle')}</h1>
          <h1 className={classes.title}>
            TVL{' '}
            {fetchVaultsDataLoaded && poolsTvl > 0 ? (
              formatGlobalTvl(poolsTvl)
            ) : (
              <TVLLoader className={classes.titleLoader} />
            )}
          </h1>
        </div>
        <div className={classes.subtitles}>
          <h3 className={classes.subtitle}>{t('Vault-SecondTitle')}</h3>
          <h3 className={classes.subtitle}>{t('Vault-WithdrawFee')}</h3>
        </div>
      </Grid>

      <VisiblePools pools={pools} apys={apys} tokens={tokens} />
    </Grid>
  );
}
