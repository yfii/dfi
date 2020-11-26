import React from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';

import { formatApy, formatTvl, calcDaily } from 'features/helpers/format';
import { format } from 'features/helpers/bignumber';
import styles from './styles';
import PoolTitle from './PoolTitle/PoolTitle';
import LabeledStat from './LabeledStat/LabeledStat';
import SummaryActions from './SummaryActions/SummaryActions';

const useStyles = makeStyles(styles);

const PoolSummary = ({
  pool,
  toggleCard,
  isOpen,
  balanceSingle,
  singleDepositedBalance,
  depositedApy,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <AccordionSummary
      className={pool.depositsPaused ? classes.detailsPaused : classes.details}
      style={{ justifyContent: 'space-between' }}
      onClick={event => {
        event.stopPropagation();
        toggleCard();
      }}
    >
      <Grid
        container
        alignItems="center"
        justify="space-around"
        spacing={1}
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <PoolTitle
          name={pool.name}
          logo={pool.logo}
          description={pool.tokenDescription}
          url={pool.tokenDescriptionUrl}
        />
        <Grid item md={7} xs={4}>
          <Grid item container justify="space-between">
            <Hidden smDown>
              <LabeledStat value={format(balanceSingle)} label={t('Vault-Balance')} xs={5} md={3} />
            </Hidden>
            <Hidden mdDown>
              <LabeledStat
                value={format(
                  singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare))
                )}
                label={t('Vault-Deposited')}
                xs={5}
                md={3}
                align="start"
              />
            </Hidden>
            <LabeledStat
              value={pool.unstableApy ? '??? %' : formatApy(pool.id, depositedApy, pool.defaultApy)}
              label={t('Vault-APY')}
              xs={5}
              md={2}
              align="start"
            />
            <LabeledStat
              value={pool.unstableApy ? '??? %' : calcDaily(depositedApy, pool.defaultApy)}
              label={t('Vault-APYDaily')}
              xs={5}
              md={2}
            />
            <LabeledStat
              value={formatTvl(pool.tvl, pool.oraclePrice, pool.fallbackPrice)}
              label={t('Vault-TVL')}
              xs={5}
              md={2}
            />
          </Grid>
        </Grid>
        <SummaryActions
          helpUrl={pool.tokenDescriptionUrl}
          toggleCard={toggleCard}
          isOpen={isOpen}
        />
      </Grid>
    </AccordionSummary>
  );
};

export default PoolSummary;
