import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-pro-react/components/typographyStyle.js';

const useStyles = makeStyles(styles);

export default function Rose(props) {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.defaultFontStyle + ' ' + classes.roseText}>{children}</div>;
}

Rose.propTypes = {
  children: PropTypes.node,
};
