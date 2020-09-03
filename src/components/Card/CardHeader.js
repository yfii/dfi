import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import styles from "assets/jss/material-kit-pro-react/components/cardHeaderStyle.js";

const useStyles = makeStyles(styles);

export default function CardHeader(props) {
  const {
    className,
    children,
    color,
    plain,
    image,
    contact,
    signup,
    noShadow,
    ...rest
  } = props;
  const classes = useStyles();
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + "CardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderImage]: image,
    [classes.cardHeaderContact]: contact,
    [classes.cardHeaderSignup]: signup,
    [classes.noShadow]: noShadow,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose"
  ]),
  plain: PropTypes.bool,
  image: PropTypes.bool,
  contact: PropTypes.bool,
  signup: PropTypes.bool,
  noShadow: PropTypes.bool,
  children: PropTypes.node
};
