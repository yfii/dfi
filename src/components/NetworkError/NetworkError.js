import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { networkSettings } from 'common/networkSetup';

import styles from './styles';

const useStyles = makeStyles(styles);

const NetworkError = ({ network }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} justify="center">
      <Typography className={classes.networkError}>
        {t('Network-Error', { network: networkSettings[network].chainName })}
      </Typography>
    </Grid>
  );
};

export default NetworkError;
