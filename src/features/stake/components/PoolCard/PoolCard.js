import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import card from '../../images/card.png';

import styles from './styles';
import harvestButton from './harvest_button.png';
import stakeButton from './stake_button.png';
import unstakeButton from './unstake_button.png';

const useStyles = makeStyles(styles);

const PoolCard = ({ pool }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.card}>
      <img className={classes.background} src={card} />
      <div className={classes.foreground}>
        <div className={classes.stakeButtons}>
          <img className={classes.button} src={stakeButton} />
          <img className={classes.button} src={unstakeButton} />
        </div>
        <div className={classes.text}>
          {t('Stake-Table-Staked')}: {pool.stakedBalance ? pool.stakedBalance.toFixed(2) : 0} {pool.name}
        </div>
        <img className={classes.button} src={harvestButton} />
        <div className={classes.text}>
          {t('Stake-Table-Total')}: {pool.tvl ? pool.tvl.toFixed() : 0}
        </div>
      </div>
    </div>
  );
}

export default PoolCard;
