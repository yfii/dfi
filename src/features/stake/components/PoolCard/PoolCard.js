import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import ProgressBar from '../ProgressBar/ProgressBar';

import styles from './styles';
import harvestButton from './harvest_button.png';
import stakeButton from './stake_button.png';
import unstakeButton from './unstake_button.png';

const useStyles = makeStyles(styles);

const calcUserPoolPercentage = ({ stakedBalance, tvl }) => {
  const poolPercentage = stakedBalance ? (stakedBalance * 100) / tvl : 0;
  return poolPercentage.toFixed();
};

const PoolCard = ({ pool, onStake, onUnstake, onHarvest }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const stakedBalance = pool.stakedBalance ? pool.stakedBalance.toFixed(2) : 0;
  const tvl = pool.tvl ? pool.tvl.toFixed() : 0;
  const percentage = `${calcUserPoolPercentage({ stakedBalance, tvl })}%`;

  return (
    <div className={classes.card}>
      <img
        className={classes.background}
        src={require(`../../images/cards/${pool.symbol}_${pool.rewardsSymbol}.png`)}
        alt="card background"
      />
      <div className={classes.foreground}>
        <div className={classes.stakeButtons}>
          <img
            className={classes.button}
            src={stakeButton}
            alt="stake button"
            onClick={onStake}
          />
          <img
            className={classes.button}
            src={unstakeButton}
            alt="unstake button"
            onClick={onUnstake}
          />
        </div>
        <div className={classes.text}>
          {t('Stake-Table-Staked')}: {stakedBalance} {pool.symbol}
        </div>
        <div className={classes.text}>
          {t('Stake-Balancer-Earned')}: {pool.rewardsAvailable ? pool.rewardsAvailable.toFixed(3) : 0} {pool.rewardsSymbol}
        </div>
        <img
          className={classes.button}
          src={harvestButton}
          alt="harvest button"
          onClick={onHarvest}
        />
        <div className={classes.text}>
          {t('Stake-Table-Apy')}:
        </div>
        <div className={classes.text}>
          {t('Stake-Table-Total')}: {tvl}
        </div>
        <ProgressBar className={classes.percentageBar} percentage={percentage} />
        <div className={classNames(classes.text, classes.percentage)}>{percentage}</div>
      </div>
    </div>
  );
}

export default PoolCard;
