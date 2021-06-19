import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import { formatApy } from '../../../../helpers/format';
import { isNaN } from '../../../../helpers/bignumber';
import LabeledStat from '../LabeledStat/LabeledStat';
import { Fade, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);

const translationKeyMap = {
  vaultApr: 'Vault-Breakdown-VaultApr',
  vaultDaily: 'Vault-Breakdown-VaultDaily',
  tradingApr: 'Vault-Breakdown-TradingApr',
  tradingDaily: 'Vault-Breakdown-TradingDaily',
  totalApy: 'Vault-Breakdown-TotalApy',
  totalDaily: 'Vault-Breakdown-TotalDaily',
  boostApr: 'Vault-Breakdown-BoostApr',
  boostDaily: 'Vault-Breakdown-BoostDaily',
  boostedTotalApy: 'Vault-Breakdown-BoostedTotalApy',
  boostedTotalDaily: 'Vault-Breakdown-BoostedTotalDaily',
};

const yearlyToDaily = apy => {
  const g = Math.pow(10, Math.log10(apy + 1) / 365) - 1;

  if (isNaN(g)) {
    return 0;
  }

  return g;
};

const BreakdownTooltip = memo(({ rows }) => {
  const classes = useStyles();

  return (
    <table>
      <tbody>
        {rows.map(row => (
          <tr key={row.label}>
            <th className={classes.label}>{row.label}</th>
            <td className={classes.value}>{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

const YearlyBreakdownTooltip = memo(({ rates }) => {
  const rows = [];

  if ('vaultApr' in rates) {
    rows.push({
      label: 'Vault APR',
      value: rates.vaultApr,
    });
  }

  if ('tradingApr' in rates) {
    rows.push({
      label: 'Trading APR',
      value: rates.tradingApr,
    });
  }

  if ('boostApr' in rates) {
    rows.push({
      label: 'Boost APR',
      value: rates.boostApr,
    });
  }

  return <BreakdownTooltip rows={rows} />;
});

const DailyBreakdownTooltip = memo(({ rates }) => {
  const rows = [];

  if ('vaultDaily' in rates) {
    rows.push({
      label: 'Vault Daily',
      value: rates.vaultDaily,
    });
  }

  if ('tradingDaily' in rates) {
    rows.push({
      label: 'Trading Daily',
      value: rates.tradingDaily,
    });
  }

  if ('boostDaily' in rates) {
    rows.push({
      label: 'Boost Daily',
      value: rates.boostDaily,
    });
  }

  return <BreakdownTooltip rows={rows} />;
});

const LabeledStatWithTooltip = memo(({ tooltip, label, ...passthrough }) => {
  const classes = useStyles();

  return tooltip ? (
    <Tooltip
      arrow
      TransitionComponent={Fade}
      title={tooltip}
      placement="bottom"
      enterTouchDelay={0}
      classes={{ tooltip: classes.tooltip }}
    >
      <LabeledStat
        label={
          <>
            {label} <i className="fas fa-info-circle" />
          </>
        }
        {...passthrough}
      />
    </Tooltip>
  ) : (
    <LabeledStat label={label} {...passthrough} />
  );
});

const ApyStats = ({
  apy,
  launchpool,
  isLoading = false,
  itemClasses,
  itemInnerClasses,
  ...passthrough
}) => {
  const { t } = useTranslation();
  const isBoosted = launchpool !== undefined;
  const values = {};
  let needsTooltip = false;

  values.totalApy = apy.totalApy;

  if ('vaultApr' in apy && apy.vaultApr) {
    needsTooltip = true;
    values.vaultApr = apy.vaultApr;
    values.vaultDaily = apy.vaultApr / 365;
  }

  if ('tradingApr' in apy && apy.tradingApr) {
    needsTooltip = true;
    values.tradingApr = apy.tradingApr;
    values.tradingDaily = apy.tradingApr / 365;
  }

  if ('vaultAprDaily' in values || 'tradingAprDaily' in values) {
    values.totalDaily = (values.vaultDaily || 0) + (values.tradingDaily || 0);
  } else {
    values.totalDaily = yearlyToDaily(values.totalApy);
  }

  if (isBoosted) {
    needsTooltip = needsTooltip || !!launchpool.apy;
    values.boostApr = launchpool.apy;
    values.boostDaily = launchpool.apy / 365;
    values.boostedTotalApy = values.boostApr ? values.totalApy + values.boostApr : 0;
    values.boostedTotalDaily = values.boostDaily ? values.totalDaily + values.boostDaily : 0;
  }

  const formatted = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, formatApy(value)])
  );

  return (
    <>
      <Grid item xs={4} className={itemClasses}>
        <LabeledStatWithTooltip
          value={formatted.totalApy}
          label={t('Vault-APY')}
          tooltip={!isLoading && needsTooltip ? <YearlyBreakdownTooltip rates={formatted} /> : null}
          boosted={isBoosted ? formatted.boostedTotalApy : ''}
          isLoading={isLoading}
          className={`tooltip-toggle ${itemInnerClasses}`}
        />
      </Grid>
      <Grid item xs={4} className={itemClasses}>
        <LabeledStatWithTooltip
          value={formatted.totalDaily}
          label={t('Vault-APYDaily')}
          tooltip={!isLoading && needsTooltip ? <DailyBreakdownTooltip rates={formatted} /> : null}
          boosted={isBoosted ? formatted.boostedTotalDaily : ''}
          isLoading={isLoading}
          className={`tooltip-toggle ${itemInnerClasses}`}
        />
      </Grid>
    </>
  );
};

export default memo(ApyStats);
