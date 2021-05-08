import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
const useStyles = makeStyles(styles);

export default () => {
  const classes = useStyles();
  return (
    <a href="/" className={classes.link}>
      <i className={`fas fa-chevron-left ${classes.linkIcon}`} />
      Back to vaults
    </a>
  );
};