import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-kit-pro-react/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Small(props) {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.defaultFontStyle + " " + classes.smallText}>
      {children}
    </div>
  );
}

Small.propTypes = {
  children: PropTypes.node
};
