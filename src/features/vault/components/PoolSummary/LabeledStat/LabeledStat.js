import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const LabeledStat = ({ value, label, xs, md }) => {
  const classes = useStyles();

  return (
    <Grid item xs={xs} md={md} className={classes.container}>
      <Typography className={classes.stat} variant="body2" gutterBottom noWrap>
        {value}
      </Typography>
      <Typography className={classes.label} variant="body2">
        {label}
      </Typography>
    </Grid>
  );
};

export default memo(LabeledStat);
