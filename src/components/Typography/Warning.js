import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-pro-react/components/typographyStyle.js';

const useStyles = makeStyles(styles);

export default function Warning(props) {
  const { children } = props;
  const classes = useStyles();
  return <div className={classes.defaultFontStyle + ' ' + classes.warningText}>{children}</div>;
}

Warning.propTypes = {
  children: PropTypes.node,
};
