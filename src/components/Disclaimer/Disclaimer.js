import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const useStyles = makeStyles(styles);

const Disclaimer = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} justify="center">
      {/* <Typography className={classes.disclaimer}>{t('Disclaimer')}</Typography> */}
      <Typography className={classes.disclaimer}>TVL AND APY DISPLAY ISSUE: THUGS PRICE API IS DOWN, CANNOT FETCH THE PRICE OF ASSETS. ALL SAFU.</Typography>
    </Grid>
  );
};

export default memo(Disclaimer);
