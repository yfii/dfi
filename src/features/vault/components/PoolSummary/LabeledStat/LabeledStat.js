import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ValueLoader from '../ValueLoader/ValueLoader';
import styles from './styles';

const useStyles = makeStyles(styles);

const LabeledStat = ({ value, label, xs, md, boosted, isLoading = false, subvalue}) => {
  const classes = useStyles();

  return (
    <Grid item xs={xs} md={md} className={classes.container}>
      <Typography className={classes.stat} variant="body2" gutterBottom>
          {boosted ? (
                  isLoading ? <ValueLoader /> :
                      <span className={classes.boosted}>{boosted}</span>
          ) : ''}

          {isLoading ? <ValueLoader /> : <span className={boosted ? classes.crossed : ''}>{value}</span>}
      </Typography>
      {subvalue && !isLoading ?
        <Typography className={classes.substat} variant='body2' gutterBottom>
          {subvalue}
        </Typography> : ''}
      <Typography className={classes.label} variant="body2">
        {label}
      </Typography>
    </Grid>
  );
};

export default memo(LabeledStat);
