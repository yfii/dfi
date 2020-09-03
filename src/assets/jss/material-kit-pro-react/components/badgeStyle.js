import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  whiteColor,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const badgeStyle = {
  badge: {
    marginRight: "3px",
    borderRadius: "12px",
    padding: "5px 12px",
    textTransform: "uppercase",
    fontSize: "10px",
    fontWeight: "500",
    lineHeight: "1",
    color: whiteColor,
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    display: "inline-block"
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
    backgroundColor: grayColor[7]
  }
};

export default badgeStyle;
