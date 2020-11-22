import React from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';

import { primaryColor } from 'assets/jss/material-kit-pro-react.js';
import { formatApy, formatTvl, calcDaily } from 'features/helpers/format';
import { format } from 'features/helpers/bignumber';
import styles from './styles';

const useStyles = makeStyles(styles);

const PoolSummary = ({
  pool,
  index,
  onClick,
  balanceSingle,
  openedCardList,
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
        onClick(index);
      }}
    >
      <Grid
        container
        alignItems="center"
        justify="space-around"
        spacing={4}
        style={{ paddingTop: '16px', paddingBottom: '16px' }}
      >
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                alt={pool.name}
                variant="square"
                src={require(`../../../../images/${pool.logo}.png`)}
              />
            </Grid>
            <Grid item style={{ minWidth: '100px' }}>
              <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom>
                {pool.name}
                <Hidden smUp>
                  <i
                    style={{
                      color: primaryColor[0],
                      marginLeft: '4px',
                      visibility: Boolean(pool.tokenDescriptionUrl) ? 'visible' : 'hidden',
                    }}
                    className={'far fa-question-circle'}
                    onClick={event => {
                      event.stopPropagation();
                      window.open(pool.tokenDescriptionUrl);
                    }}
                  />
                </Hidden>
              </Typography>
              <Typography className={classes.iconContainerSubTitle} variant="body2">
                {pool.tokenDescription}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={7} xs={4}>
          <Grid item container justify="space-between">
            <Hidden smDown>
              <Grid item xs={4} md={3} container justify="center" alignItems="center">
                <Grid item style={{ width: '200px' }}>
                  <Typography
                    className={classes.iconContainerMainTitle}
                    variant="body2"
                    gutterBottom
                    noWrap
                  >
                    {format(balanceSingle)}
                  </Typography>
                  <Typography className={classes.iconContainerSubTitle} variant="body2">
                    {t('Vault-Balance')}
                  </Typography>
                </Grid>
              </Grid>
            </Hidden>

            <Hidden mdDown>
              <Grid item xs={4} md={3} container justify="center" alignItems="center">
                <Grid item style={{ width: '200px' }}>
                  <Typography
                    className={classes.iconContainerMainTitle}
                    variant="body2"
                    gutterBottom
                    noWrap
                  >
                    {format(
                      singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare))
                    )}
                  </Typography>
                  <Typography className={classes.iconContainerSubTitle} variant="body2">
                    {t('Vault-Deposited')}
                  </Typography>
                </Grid>
              </Grid>
            </Hidden>

            <Grid item xs={5} md={2} container justify="center" alignItems="center">
              <Grid item>
                <Typography
                  className={classes.iconContainerMainTitle}
                  variant="body2"
                  gutterBottom
                  noWrap
                >
                  {pool.unstableApy ? '??? %' : formatApy(pool.id, depositedApy, pool.defaultApy)}
                </Typography>
                <Typography className={classes.iconContainerSubTitle} variant="body2">
                  {t('Vault-APY')}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={5} md={2} container justify="center" alignItems="center">
              <Grid item>
                <Typography
                  className={classes.iconContainerMainTitle}
                  variant="body2"
                  gutterBottom
                  noWrap
                >
                  {pool.unstableApy ? '??? %' : calcDaily(depositedApy, pool.defaultApy)}
                </Typography>
                <Typography className={classes.iconContainerSubTitle} variant="body2">
                  {t('Vault-APYDaily')}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={5} md={2} container justify="center" alignItems="center">
              <Grid item>
                <Typography
                  className={classes.iconContainerMainTitle}
                  variant="body2"
                  gutterBottom
                  noWrap
                >
                  {' '}
                  {formatTvl(pool.tvl, pool.oraclePrice, pool.fallbackPrice)}
                </Typography>
                <Typography className={classes.iconContainerSubTitle} variant="body2">
                  {t('Vault-TVL')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid item container justify="flex-end" alignItems="center" spacing={2}>
            <Hidden mdDown>
              <Grid item>
                <IconButton
                  classes={{
                    root: classes.iconContainerSecond,
                  }}
                  style={{
                    visibility: Boolean(pool.tokenDescriptionUrl) ? 'visible' : 'hidden',
                  }}
                  onClick={event => {
                    event.stopPropagation();
                    window.open(pool.tokenDescriptionUrl);
                  }}
                >
                  <i className={'far fa-question-circle'} />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item>
              <IconButton
                className={classes.iconContainerPrimary}
                onClick={event => {
                  event.stopPropagation();
                  onClick(index);
                }}
              >
                {openedCardList.includes(index) ? (
                  <i className={'far fa-arrow-alt-circle-up'} />
                ) : (
                  <i className={'far fa-arrow-alt-circle-down'} />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AccordionSummary>
  );
};

export default PoolSummary;
