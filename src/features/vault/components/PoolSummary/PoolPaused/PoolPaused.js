import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const PoolPaused = ({ message, isBoosted, isExperimental }) => {
  const classes = useStyles();

  return (
    <div
      className={[
        classes.container,
        isBoosted ? classes.launchpool : isExperimental ? classes.experimental : '',
      ].join(' ')}
    >
      <div className={classes.texts}>{message}</div>
    </div>
  );
};

export default memo(PoolPaused);
