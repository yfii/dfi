import React from 'react';
import { useTranslation } from 'react-i18next';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { sectionTitleStyle } from "../jss";

const useStyles = makeStyles(sectionTitleStyle);

export default function SectionTitle() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container item className={classes.root} justify="center">
      <Typography variant="h1" className={classNames(classes.title)} noWrap>{t('Liquidity-Title')}</Typography>
    </Grid>
  )
}
