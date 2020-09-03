import {
  container,
  title,
  cardTitle,
  description,
  mlAuto,
  mrAuto,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

import modalStyle from "assets/jss/material-kit-pro-react/modalStyle.js";
import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";
import popoverStyles from "assets/jss/material-kit-pro-react/popoverStyles.js";
import customCheckboxRadioSwitch from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";

const javascriptStyles = theme => ({
  container,
  description,
  cardTitle,
  mlAuto,
  mrAuto,
  ...tooltipsStyle,
  ...popoverStyles,
  ...modalStyle(theme),
  ...customCheckboxRadioSwitch,
  section: {
    padding: "70px 0 0"
  },
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  icon: {
    width: "24px",
    height: "24px",
    color: grayColor[13]
  },
  label: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    transition: "0.3s ease all",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingLeft: "0"
  },
  textCenter: {
    textAlign: "center"
  },
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + "  !important"
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0"
  },
  socialLineButton: {
    "&, &:hover": { color: whiteColor },
    marginLeft: "5px",
    marginRight: "5px"
  },
  cardLoginHeader: {
    marginTop: "-40px",
    padding: "20px 0",
    width: "100%",
    marginBottom: "15px"
  },
  cardLoginBody: {
    paddingTop: "0",
    paddingBottom: "0"
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  infoArea: {
    padding: "0px 0px 20px !important"
  },
  space50: {
    height: "50px",
    display: "block"
  }
});

export default javascriptStyles;
