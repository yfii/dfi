import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-pro-react/components/footerStyle.js';

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const { children, content, theme, big, className } = props;
  const classes = useStyles();
  const themeType = theme === 'transparent' || theme == undefined ? false : true;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes[theme]]: themeType,
    [classes.big]: big || children !== undefined,
    [className]: className !== undefined,
  });
  const aClasses = classNames({
    [classes.a]: true,
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        {children !== undefined ? (
          <div>
            <div className={classes.content}>{children}</div>
            <hr />
          </div>
        ) : (
          ' '
        )}
        {content}
        <div className={classes.clearFix} />
      </div>
    </footer>
  );
}

Footer.propTypes = {
  theme: PropTypes.oneOf(['dark', 'white', 'transparent']),
  big: PropTypes.bool,
  content: PropTypes.node.isRequired,
};
