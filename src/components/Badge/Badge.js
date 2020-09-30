import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-pro-react/components/badgeStyle.js';

const useStyles = makeStyles(styles);

export default function Badge(props) {
  const { color, children, className } = props;
  const classes = useStyles();
  const badgeClasses = classNames({
    [classes.badge]: true,
    [classes[color]]: true,
    [className]: className !== undefined,
  });
  return <span className={badgeClasses}>{children}</span>;
}

Badge.defaultProps = {
  color: 'gray',
};

Badge.propTypes = {
  color: PropTypes.oneOf(['primary', 'warning', 'danger', 'success', 'info', 'rose', 'gray']),
  className: PropTypes.string,
  children: PropTypes.node,
};
