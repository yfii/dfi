import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const useStyles = makeStyles(styles);

export const CakeV2Banner = memo(() => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.box}>
      <div className={`${classes.feature} ${classes.featureFirst}`}>
        <div className={classes.featureLabel}>
          {t('Vault-Banner-CakeV2-StakeLabel', { symbol: 'CAKE' })}
        </div>
        <div>{t('Vault-Banner-CakeV2-StakeValue', { symbol: 'CAKE' })}</div>
      </div>
      <div className={classes.logoFeature}>
        <div className={classes.logoHolder}>
          <img
            src={require('images/banners/CakeBanner.svg')}
            className={classes.logo}
            alt=""
            role="presentation"
            aria-hidden="true"
          />
        </div>
      </div>
      <div className={classes.feature}>
        <div className={classes.featureLabel}>{t('Vault-Banner-CakeV2-SaferLabel')}</div>
        <div>{t('Vault-Banner-CakeV2-SaferValue', { count: 0 })}</div>
      </div>
      <div className={classes.feature}>
        <div className={classes.featureLabel}>{t('Vault-Banner-CakeV2-SmarterLabel')}</div>
        <div>{t('Vault-Banner-CakeV2-SmarterValue', { count: 8760 })}</div>
      </div>
      <div className={`${classes.feature} ${classes.featureLast}`}>
        <div className={classes.featureLabel}>{t('Vault-Banner-CakeV2-FairerLabel')}</div>
        <div>{t('Vault-Banner-CakeV2-FairerValue', { percent: 77 })}</div>
      </div>
    </div>
  );
});
