import React from 'react';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import sectionTitleStyle from '../jss/sections/sectionTitleStyle';

const useStyles = makeStyles(sectionTitleStyle);
export default function SectionTitle() {
  const { t } = useTranslation();
  const classes = useStyles();

  // TODO: Add Translation.
  return (
    <Grid container item className={classes.root} justify="center">
      <Typography className={classes.disclaimer}>This project is in Beta. Use with caution and DYOR.</Typography>
    </Grid>
  );
}
