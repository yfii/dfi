import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const customLinearProgressStyle = {
  root: {
    height: "4px",
    marginBottom: "20px",
    overflow: "hidden"
  },
  bar: {
    height: "4px"
  },
  primary: {
    backgroundColor: primaryColor[0]
  },
  warning: {
    backgroundColor: warningColor[0]
  },
  danger: {
    backgroundColor: dangerColor[0]
  },
  success: {
    backgroundColor: successColor[0]
  },
  info: {
    backgroundColor: infoColor[0]
  },
  rose: {
    backgroundColor: roseColor[0]
  },
  gray: {
    backgroundColor: grayColor[0]
  },
  primaryBackground: {
    background: "rgba(" + hexToRgb(primaryColor[0]) + ", 0.2)"
  },
  warningBackground: {
    background: "rgba(" + hexToRgb(warningColor[0]) + ", 0.2)"
  },
  dangerBackground: {
    background: "rgba(" + hexToRgb(dangerColor[0]) + ", 0.2)"
  },
  successBackground: {
    background: "rgba(" + hexToRgb(successColor[0]) + ", 0.2)"
  },
  infoBackground: {
    background: "rgba(" + hexToRgb(infoColor[0]) + ", 0.2)"
  },
  roseBackground: {
    background: "rgba(" + hexToRgb(roseColor[0]) + ", 0.2)"
  },
  grayBackground: {
    background: "rgba(" + hexToRgb(grayColor[6]) + ", 0.2)"
  }
};

export default customLinearProgressStyle;
