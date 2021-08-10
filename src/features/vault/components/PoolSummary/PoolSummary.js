import React, { useCallback, useMemo } from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { formatTvl } from 'features/helpers/format';
import { byDecimals } from 'features/helpers/bignumber';
import styles from './styles';
import PoolPaused from './PoolPaused/PoolPaused';
import PoolTitle from './PoolTitle/PoolTitle';
import LabeledStat from './LabeledStat/LabeledStat';
import ApyStats from './ApyStats/ApyStats';
import { usePoolApr } from '../../../stake/redux/subscription';
import { PoolBoosts } from './PoolBoosts/PoolBoosts';
import { getRetireReason } from './RetireReason/RetireReason';

const useStyles = makeStyles(styles);

const PoolSummary = ({
  pool,
  launchpool,
  toggleCard,
  balanceSingle,
  sharesBalance,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
  multipleLaunchpools = false,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const launchpoolApr = usePoolApr(launchpool ? launchpool.id : null);
  const vaultStateTitle = useMemo(() => {
    let state =
      pool.status === 'eol'
        ? t(getRetireReason(pool.retireReason))
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

  const balanceUsd =
    balanceSingle > 0 && fetchVaultsDataDone ? formatTvl(balanceSingle, pool.oraclePrice) : '';
  const deposited = byDecimals(
    sharesBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)),
    pool.tokenDecimals
  );
  const depositedUsd =
    deposited > 0 && fetchVaultsDataDone ? formatTvl(deposited, pool.oraclePrice) : '';

  const onSummaryClick = useCallback(
    e => {
      if (!e.target || !e.target.classList.contains('tooltip-toggle')) {
        toggleCard();
      }
    },
    [toggleCard]
  );

  return (
    <AccordionSummary
      className={
        pool.status === 'eol'
          ? classes.detailsRetired
          : pool.depositsPaused
          ? classes.detailsPaused
          : classes.details
      }
      style={{ justifyContent: 'space-between' }}
      onClick={onSummaryClick}
    >
      <Grid container alignItems="center" style={{ paddingTop: '20px' }}>
        {vaultStateTitle}
        <PoolBoosts poolName={pool.name} earnedTokenAddress={pool.earnedTokenAddress} />
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
            multipleLaunchpools={multipleLaunchpools}
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
          launchpoolApr={launchpoolApr}
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
    </AccordionSummary>
  );
};

const formatDecimals = number => {
  return number >= 10 ? number.toFixed(4) : number.isEqualTo(0) ? 0 : number.toFixed(8);
};

export default PoolSummary;
