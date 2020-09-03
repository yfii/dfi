import {
  whiteColor,
  blackColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const tooltipsStyle = {
  tooltip: {
    padding: "10px 15px",
    minWidth: "130px",
    color: whiteColor,
    lineHeight: "1.7em",
    background: "rgba(" + hexToRgb(grayColor[15]) + ",0.9)",
    border: "none",
    borderRadius: "3px",
    boxShadow:
      "0 8px 10px 1px rgba(" +
      hexToRgb(blackColor) +
      ", 0.14), 0 3px 14px 2px rgba(" +
      hexToRgb(blackColor) +
      ", 0.12), 0 5px 5px -3px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
    maxWidth: "200px",
    textAlign: "center",
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    fontSize: "0.875em",
    fontStyle: "normal",
    fontWeight: "400",
    textShadow: "none",
    textTransform: "none",
    letterSpacing: "normal",
    wordBreak: "normal",
    wordSpacing: "normal",
    wordWrap: "normal",
    whiteSpace: "normal",
    lineBreak: "auto"
  }
};

export default tooltipsStyle;
