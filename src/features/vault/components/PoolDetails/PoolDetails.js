import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';

import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchApys, useFetchBalances, useFetchVaultsData } from '../../redux/hooks';
import { byDecimals } from 'features/helpers/bignumber';
import { calcDaily, formatApy, formatTvl } from 'features/helpers/format';
import HomeLink from './HomeLink/HomeLink';
import PoolActions from '../PoolActions/PoolActions';
import PoolTitle from '../PoolSummary/PoolTitle/PoolTitle';
import LabeledStat from '../PoolSummary/LabeledStat/LabeledStat';
import styles from './styles';
import { Helmet } from 'react-helmet';
import { getNetworkFriendlyName } from '../../../helpers/getNetworkData';
import { getPageMeta, usePageMeta } from '../../../common/getPageMeta';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};

const PoolDetails = ({ vaultId }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  const { pools, fetchVaultsData, fetchVaultsDataDone } = useFetchVaultsData();
  const { tokens, fetchBalances, fetchBalancesDone } = useFetchBalances();
  const { apys, fetchApys, fetchApysDone } = useFetchApys();
  const pool = pools.find(p => p.id === vaultId);
  const stake = useSelector(state => state.stake.pools);
  const { getPageMeta } = usePageMeta();

  const launchpool = useMemo(() => {
    const timestamp = Math.floor(Date.now() / 1000);
    for (let index in stake) {
      if (stake[index].token === pool.earnedToken && stake[index].periodFinish >= timestamp) {
        stake[index].poolIndex = Number(index) + 1;
        return stake[index];
      }
    }
  }, [pool, stake]);

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

  const vaultStateTitle = useMemo(() => {
    let state =
      pool.status === 'eol'
        ? t('Vault-DepositsRetiredTitle')
        : pool.paused
        ? t('Vault-DepositsPausedTitle')
        : null;

    if (launchpool) {
      state = t('Stake-BoostedBy', { name: launchpool.name });
    }

    if (pool.experimental) {
      state = t('Vault-Experimental');
    }

    return state === null ? (
      ''
    ) : (
      <Paper variant="outlined" elevation={5} className={classes.status}>
        {state}
      </Paper>
    );
  }, [pool, launchpool]);

  /*
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
  */
  const balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
  const apy = apys[pool.id] || 0;

  const balanceUsd =
    balanceSingle > 0 && fetchVaultsDataDone ? formatTvl(balanceSingle, pool.oraclePrice) : '';
  const deposited = byDecimals(
    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
    pool.tokenDecimals
  );
  const depositedUsd =
    deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, pool.oraclePrice) : '';
  const mobilePadding = balanceSingle > 0 || deposited > 0 ? '24px' : '10px';

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

  return (
    <>
      <Helmet>
        <title>
          {getPageMeta('Vault-Meta-Title', {
            vaultName: pool.name,
            vaultDescription: pool.tokenDescription,
          })}
        </title>
        <meta
          property="og:title"
          content={getPageMeta('Vault-Meta-Title', {
            vaultName: pool.name,
            vaultDescription: pool.tokenDescription,
          })}
        />
      </Helmet>
      <HomeLink />
      <div className={classes.container}>
        {vaultStateTitle}
        <Grid className={classes.summary} container justify="space-around" xs={12} spacing={0}>
          <PoolTitle
            name={pool.name}
            logo={pool.logo}
            description={pool.tokenDescription}
            url={pool.tokenDescriptionUrl}
            columns={6}
          />
          <Grid item md={8} xs={7}>
            <Grid item container justify="space-between">
              <Hidden smDown>
                <LabeledStat
                  value={formatDecimals(balanceSingle)}
                  subvalue={balanceUsd}
                  label={t('Vault-Balance')}
                  isLoading={!fetchBalancesDone}
                  xs={5}
                  md={3}
                />
                <LabeledStat
                  value={formatDecimals(deposited)}
                  subvalue={depositedUsd}
                  label={t('Vault-Deposited')}
                  isLoading={!fetchBalancesDone}
                  xs={5}
                  md={3}
                  align="start"
                />
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
              <Hidden mdUp>
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', paddingTop: mobilePadding }}
                  className={classes.mobilePadding}
                >
                  <LabeledStat
                    value={formatDecimals(balanceSingle)}
                    subvalue={balanceUsd}
                    label={t('Vault-Balance')}
                    isLoading={!fetchBalancesDone}
                    xs={6}
                  />
                  <LabeledStat
                    value={formatDecimals(deposited)}
                    subvalue={depositedUsd}
                    label={t('Vault-Deposited')}
                    isLoading={!fetchBalancesDone}
                    xs={6}
                    align="start"
                  />
                </Grid>
                <Grid item xs={12} style={{ display: 'flex', paddingTop: '20px' }}>
                  <LabeledStat
                    value={formatApy(apy)}
                    label={t('Vault-APY')}
                    isLoading={!fetchApysDone}
                    boosted={launchpool ? formatApy(launchpool.apy + apy) : ''}
                    xs={4}
                    align="start"
                  />
                  <LabeledStat
                    value={calcDaily(apy)}
                    label={t('Vault-APYDaily')}
                    isLoading={!fetchApysDone}
                    boosted={launchpool ? calcDaily(launchpool.apy + apy) : ''}
                    xs={4}
                  />
                  <LabeledStat
                    value={formatTvl(pool.tvl, pool.oraclePrice)}
                    label={t('Vault-TVL')}
                    isLoading={!fetchVaultsDataDone}
                    xs={4}
                  />
                </Grid>
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
