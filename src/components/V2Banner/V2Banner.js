import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import styles from './styles';

const useStyles = makeStyles(styles);

const V2Banner = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container item className={classes.root}>
      <Box className={classes.textContainer}>
        <Typography className={classes.title}>{t('V2Banner-Title')}</Typography>
        <Typography className={classes.text}>{t('V2Banner-Text')}</Typography>
      </Box>
      <a
        className={classes.btn}
        target="_blank"
        rel="noopener noreferrer"
        href="https://beta.beefy.finance/#/"
      >
        {t('V2Banner-Button')}
      </a>
    </Grid>
  );
};

export default memo(V2Banner);
