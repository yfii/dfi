import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const ProgressBar = ({ className, percentage }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.background, className)}>
      <div className={classes.foreground} style={{ width: percentage }} />
    </div>
  );
};

export default ProgressBar;
