import React from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from 'assets/jss/material-kit-pro-react/components/disclaimerStyle.js';

const useStyles = makeStyles(styles);

export default function SectionTitle() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} justify="center">
      <Typography className={classes.disclaimer}>{t('Disclaimer')}</Typography>
    </Grid>
  );
}
