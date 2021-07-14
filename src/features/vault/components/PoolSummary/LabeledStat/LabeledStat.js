import React, { forwardRef, memo } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ValueLoader from '../../../../common/components/ValueLoader/ValueLoader';
import styles from './styles';

const useStyles = makeStyles(styles);

const LabeledStat = forwardRef(
  ({ value, label, boosted, isLoading = false, subvalue, ...passthrough }, ref) => {
    const classes = useStyles();

    return (
      <div {...passthrough} ref={ref}>
        <Typography className={classes.stat} variant="body2" gutterBottom>
          {subvalue && !isLoading ? <span className={classes.substat}>{subvalue}</span> : ''}
          {boosted ? (
            isLoading ? (
              <ValueLoader />
            ) : (
              <span className={classes.boosted}>{boosted}</span>
            )
          ) : (
            ''
          )}
          {isLoading ? (
            <ValueLoader />
          ) : (
            <span className={boosted ? classes.crossed : ''}>{value}</span>
          )}
        </Typography>
        <Typography className={classes.label} variant="body2">
          {label}
        </Typography>
      </div>
    );
  }
);

export default memo(LabeledStat);
