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
  const { t } = useTranslation();

  if ('vaultApr' in rates) {
    rows.push({
      label: t('Vault-Breakdown-VaultApr'),
      value: rates.vaultApr,
    });
  }

  if ('tradingApr' in rates) {
    rows.push({
      label: t('Vault-Breakdown-TradingApr'),
      value: rates.tradingApr,
    });
  }

  if ('boostApr' in rates) {
    rows.push({
      label: t('Vault-Breakdown-BoostApr'),
      value: rates.boostApr,
    });
  }

  return <BreakdownTooltip rows={rows} />;
});

const DailyBreakdownTooltip = memo(({ rates }) => {
  const rows = [];
  const { t } = useTranslation();

  if ('vaultDaily' in rates) {
    rows.push({
      label: t('Vault-Breakdown-VaultDaily'),
      value: rates.vaultDaily,
    });
  }

  if ('tradingDaily' in rates) {
    rows.push({
      label: t('Vault-Breakdown-TradingDaily'),
      value: rates.tradingDaily,
    });
  }

  if ('boostDaily' in rates) {
    rows.push({
      label: t('Vault-Breakdown-BoostDaily'),
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
      leaveTouchDelay={3000}
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

const ApyStats = ({ apy, launchpoolApr, isLoading = false, itemClasses, itemInnerClasses }) => {
  const { t } = useTranslation();
  const isBoosted = !!launchpoolApr;
  const values = {};
  let needsApyTooltip = false;
  let needsDailyTooltip = false;

  values.totalApy = apy.totalApy;

  if ('vaultApr' in apy && apy.vaultApr) {
    needsApyTooltip = true;
    values.vaultApr = apy.vaultApr;
    values.vaultDaily = apy.vaultApr / 365;
  }

  if ('tradingApr' in apy && apy.tradingApr) {
    needsApyTooltip = true;
    needsDailyTooltip = true;
    values.tradingApr = apy.tradingApr;
    values.tradingDaily = apy.tradingApr / 365;
  }

  if ('vaultAprDaily' in values || 'tradingAprDaily' in values) {
    values.totalDaily = (values.vaultDaily || 0) + (values.tradingDaily || 0);
  } else {
    values.totalDaily = yearlyToDaily(values.totalApy);
  }

  if (isBoosted) {
    needsApyTooltip = true;
    needsDailyTooltip = true;
    values.boostApr = launchpoolApr;
    values.boostDaily = launchpoolApr / 365;
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
          tooltip={
            !isLoading && needsApyTooltip ? <YearlyBreakdownTooltip rates={formatted} /> : null
          }
          boosted={isBoosted ? formatted.boostedTotalApy : ''}
          isLoading={isLoading}
          className={`tooltip-toggle ${itemInnerClasses}`}
        />
      </Grid>
      <Grid item xs={4} className={itemClasses}>
        <LabeledStatWithTooltip
          value={formatted.totalDaily}
          label={t('Vault-APYDaily')}
          tooltip={
            !isLoading && needsDailyTooltip ? <DailyBreakdownTooltip rates={formatted} /> : null
          }
          boosted={isBoosted ? formatted.boostedTotalDaily : ''}
          isLoading={isLoading}
          className={`tooltip-toggle ${itemInnerClasses}`}
        />
      </Grid>
    </>
  );
};

export default memo(ApyStats);
