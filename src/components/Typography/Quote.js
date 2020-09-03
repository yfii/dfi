import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-kit-pro-react/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Quote(props) {
  const { text, author, authorClassName, textClassName } = props;
  const classes = useStyles();
  const quoteClasses = classNames(classes.defaultFontStyle, classes.quote);
  const quoteTextClasses = classNames({
    [classes.quoteText]: true,
    [textClassName]: textClassName !== undefined
  });
  const quoteAuthorClasses = classNames({
    [classes.quoteAuthor]: true,
    [authorClassName]: authorClassName !== undefined
  });
  return (
    <blockquote className={quoteClasses}>
      <p className={quoteTextClasses}>{text}</p>
      <small className={quoteAuthorClasses}>{author}</small>
    </blockquote>
  );
}

Quote.propTypes = {
  text: PropTypes.node,
  author: PropTypes.node,
  textClassName: PropTypes.string,
  authorClassName: PropTypes.string
};
