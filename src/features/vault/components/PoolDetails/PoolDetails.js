import React, { useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';

import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchBalances, useFetchVaultsData, useFetchApys } from '../../redux/hooks';
import { byDecimals } from 'features/helpers/bignumber';
import { formatApy, formatTvl, calcDaily } from 'features/helpers/format';
import HomeLink from './HomeLink/HomeLink';
import PoolActions from '../PoolActions/PoolActions';
import PoolTitle from '../PoolSummary/PoolTitle/PoolTitle';
import LabeledStat from '../PoolSummary/LabeledStat/LabeledStat';
import styles from './styles';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

const PoolDetails = ({ vaultId }) => {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataDone } = useFetchVaultsData();
  const { tokens, fetchBalances } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const pool = pools.find(p => p.id === vaultId);

  useEffect(() => {
    if (address && web3) {
      const fetch = () => {
        fetchBalances({ address, web3, tokens });
        fetchVaultsData({ address, web3, pools });
        fetchApys();
      };
      fetch();

      const id = setInterval(fetch, FETCH_INTERVAL_MS);
      return () => clearInterval(id);
    }

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchVaultsData]);

  const classes = useStyles(pool);

  if (!fetchVaultsDataDone) {
    return (
      <div className={classes.container}>
        <HomeLink />
        <h1>Loading Vault...</h1>
      </div>
    );
  } else if (!pool) {
    return (
      <div className={classes.container}>
        <HomeLink />
        <h1>Vault {vaultId} not found</h1>
      </div>
    );
  }

  const vaultStateTitle =
    pool.status === 'eol' ? (
      <>
        <i className={`fas fa-exclamation-circle ${classes.statusIcon}`} />{' '}
        {t('Vault-DepositsRetiredTitle')}
      </>
    ) : pool.depositsPaused ? (
      <>
        <i className={`fas fa-exclamation-triangle ${classes.statusIcon}`} />{' '}
        {t('Vault-DepositsPausedTitle')}
      </>
    ) : null;
  const vaultState = !!vaultStateTitle && (
    <Paper variant="outlined" elevation={5} className={classes.status}>
      {vaultStateTitle}
    </Paper>
  );

  const balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
  const apy = apys[pool.id] || 0;

  return (
    <>
      <HomeLink />
      <div className={classes.container}>
        <h1 className={classes.heading}>Vault Details</h1>
        {vaultState}
        <Grid className={classes.summary} container justify="space-around" xs={12} spacing={0}>
          <PoolTitle
            name={pool.name}
            logo={pool.logo}
            description={pool.tokenDescription}
            url={pool.tokenDescriptionUrl}
            columns={6}
          />
          <Grid item xs={4}>
            <Grid item container justify="space-between">
              <Hidden smDown>
                <LabeledStat
                  value={formatApy(apy)}
                  label={t('Vault-APY')}
                  isLoading={!fetchApysDone}
                  xs={5}
                  md={2}
                  align="start"
                />
                <LabeledStat
                  value={calcDaily(apy)}
                  label={t('Vault-APYDaily')}
                  isLoading={!fetchApysDone}
                  xs={5}
                  md={2}
                />
                <LabeledStat
                  value={formatTvl(pool.tvl, pool.oraclePrice)}
                  label={t('Vault-TVL')}
                  isLoading={!fetchVaultsDataDone}
                  xs={5}
                  md={2}
                />
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        {pool.tokenDescriptionUrl && pool.tokenDescriptionUrl !== '#' && (
          <section className={classes.description}>
            <p>
              Link:{' '}
              <a target="_blank" rel="noopener noreferrer" href={pool.tokenDescriptionUrl}>
                {pool.tokenDescriptionUrl}
              </a>
            </p>
          </section>
        )}
        <Divider variant="middle" />
        <PoolActions pool={pool} balanceSingle={balanceSingle} sharesBalance={sharesBalance} />
      </div>
    </>
  );
};

export default PoolDetails;
