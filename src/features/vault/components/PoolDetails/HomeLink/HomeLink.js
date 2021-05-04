import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
const useStyles = makeStyles(styles);

export default () => {
  const classes = useStyles();
  return (
    <Link to="/" className={classes.link}>
      <i className={`fas fa-chevron-left ${classes.linkIcon}`} />
      Back to vaults
    </Link>
  );
};