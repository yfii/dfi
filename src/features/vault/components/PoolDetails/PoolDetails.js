import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchApys, useFetchBalances, useFetchVaultsData } from '../../redux/hooks';
import { useFetchPoolData } from '../../../stake/redux/fetchPoolData';
import { byDecimals } from 'features/helpers/bignumber';
import { formatTvl } from 'features/helpers/format';
import HomeLink from './HomeLink/HomeLink';
import PoolActions from '../PoolActions/PoolActions';
import PoolTitle from '../PoolSummary/PoolTitle/PoolTitle';
import LabeledStat from '../PoolSummary/LabeledStat/LabeledStat';
import styles from './styles';
import { Helmet } from 'react-helmet';
import { usePageMeta } from '../../../common/getPageMeta';
import ApyStats from '../PoolSummary/ApyStats/ApyStats';
import PoolPaused from '../PoolSummary/PoolPaused/PoolPaused';
import { CakeV2Banner } from './Banners/CakeV2Banner/CakeV2Banner';

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
  const { fetchPoolData } = useFetchPoolData();
  const { getPageMeta } = usePageMeta();
  const timestamp = Math.floor(Date.now() / 1000);
  const stake = useSelector(state => state.stake.pools);
  const launchpoolIndex = stake.findIndex(p => {
    return p.token === pool.earnedToken && p.periodFinish >= timestamp;
  });
  const launchpool = launchpoolIndex ? stake[launchpoolIndex] : null;

  useEffect(() => {
    if (address && web3) {
      const fetch = () => {
        fetchBalances({ address, web3, tokens });
        fetchVaultsData({ address, web3, pools });
        if (launchpoolIndex >= 0) {
          fetchPoolData(launchpoolIndex);
        }
        fetchApys();
      };
      fetch();

      const id = setInterval(fetch, FETCH_INTERVAL_MS);
      return () => clearInterval(id);
    }

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchVaultsData, fetchPoolData, launchpoolIndex]);

  const vaultStateTitle = useMemo(() => {
    let state =
      pool.status === 'eol'
        ? t('Vault-DepositsRetiredTitle')
        : pool.depositsPaused
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
      <PoolPaused
        message={t(state)}
        isBoosted={!!launchpool}
        isExperimental={!!pool.experimental}
      />
    );
  }, [pool, launchpool, t]);

  const balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
  const apy = apys[pool.id] || { totalApy: 0 };

  const balanceUsd =
    balanceSingle > 0 && fetchVaultsDataDone ? formatTvl(balanceSingle, pool.oraclePrice) : '';
  const deposited = byDecimals(
    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
    pool.tokenDecimals
  );
  const depositedUsd =
    deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, pool.oraclePrice, false) : '';

  if (!fetchVaultsDataDone) {
    return (
      <>
        <HomeLink />
        {vaultId === 'cake-cakev2' ? <CakeV2Banner /> : ''}
        <div className={classes.container}>
          <div className={classes.loading}>{t('Vault-Loading')}</div>
        </div>
      </>
    );
  } else if (!pool) {
    return (
      <>
        <HomeLink />
        <div className={classes.container}>
          <div className={classes.error}>Vault {vaultId} not found</div>
        </div>
      </>
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
      {vaultId === 'cake-cakev2' ? <CakeV2Banner /> : ''}
      <div className={classes.container}>
        <Grid container alignItems="center" style={{ paddingTop: '20px' }}>
          {vaultStateTitle}
          <Grid item xs={12} className={`${classes.item} ${classes.itemTitle}`}>
            <PoolTitle
              name={pool.name}
              logo={pool.logo}
              poolId={pool.id}
              description={t('Vault-Description', { vault: pool.tokenDescription })}
              launchpool={launchpool}
              addLiquidityUrl={pool.addLiquidityUrl}
              removeLiquidityUrl={pool.removeLiquidityUrl}
              buyTokenUrl={pool.buyTokenUrl}
              assets={pool.assets}
            />
          </Grid>
          <Grid item xs={6} className={`${classes.item} ${classes.itemBalances}`}>
            <LabeledStat
              value={formatDecimals(balanceSingle)}
              subvalue={balanceUsd}
              label={t('Vault-Wallet')}
              isLoading={!fetchBalancesDone}
              className={classes.itemInner}
            />
          </Grid>
          <Grid item xs={6} className={`${classes.item} ${classes.itemBalances}`}>
            <LabeledStat
              value={formatDecimals(deposited)}
              subvalue={depositedUsd}
              label={t('Vault-Deposited')}
              isLoading={!fetchBalancesDone}
              className={classes.itemInner}
            />
          </Grid>
          <ApyStats
            apy={apy}
            launchpoolApr={launchpool && launchpool.apy ? launchpool.apy : null}
            isLoading={!fetchApysDone}
            itemClasses={`${classes.item} ${classes.itemStats}`}
            itemInnerClasses={classes.itemInner}
          />
          <Grid item xs={4} className={`${classes.item} ${classes.itemStats}`}>
            <LabeledStat
              value={formatTvl(pool.tvl, pool.oraclePrice)}
              label={t('Vault-TVL')}
              isLoading={!fetchVaultsDataDone}
              className={classes.itemInner}
            />
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
