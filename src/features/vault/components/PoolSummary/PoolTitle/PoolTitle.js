import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const PoolTitle = ({
  name,
  logo,
  poolId,
  description,
  launchpool,
  buyTokenUrl,
  addLiquidityUrl,
  removeLiquidityUrl,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid item xs={3} className={classes.container}>
      <Avatar
        alt={name}
        variant="square"
        imgProps={{ style: { objectFit: 'contain' } }}
        src={require(`images/${logo}`)}
      />
      <div className={classes.texts}>
        <Typography className={classes.title} variant="body2" gutterBottom>
          {poolId ? (
            <a href={`/vault/${poolId}`} className={classes.url}>
              {name}
            </a>
          ) : (
            name
          )}
        </Typography>
        <Typography className={classes.subtitle} variant="body2">
          {description}
        </Typography>
        <div style={{ display: 'flex', marginTop: '6px' }}>
          {buyTokenUrl ? (
            <a className={classes.url} href={buyTokenUrl} target="_blank" rel="noopener noreferrer">
              <span>{name === 'WBNB' ? t('Wrap-BNB') : t('Buy-Token')}</span>
              {'\u00A0\u00A0'}
            </a>
          ) : (
            ''
          )}
          {addLiquidityUrl ? (
            <a
              className={classes.url}
              href={addLiquidityUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('Add-Liquidity')}</span>
            </a>
          ) : (
            ''
          )}
          {removeLiquidityUrl ? (
            <a
              className={classes.url}
              href={removeLiquidityUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('Remove-Liquidity')}</span>
            </a>
          ) : (
            ''
          )}
        </div>
        {launchpool ? (
          <a className={classes.btnBoost} href={'/stake/pool/' + launchpool.poolIndex}>
            <img alt="Boost" src={require('images/stake/boost.svg')} height={15} />
            <span>
              <img alt="Fire" src={require('images/stake/fire.png')} height={30} />
            </span>
          </a>
        ) : (
          ''
        )}
      </div>
    </Grid>
  );
};

export default memo(PoolTitle);
