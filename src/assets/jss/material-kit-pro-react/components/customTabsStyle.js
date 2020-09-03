import {
  whiteColor,
  defaultFont,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const customTabsStyle = {
  cardTitle: {
    ...defaultFont,
    float: "left",
    padding: "10px 10px 10px 0",
    lineHeight: "24px",
    fontSize: "14px",
    color: whiteColor
  },
  cardTitleRTL: {
    float: "right",
    padding: "10px 0px 10px 10px !important"
  },
  displayNone: {
    display: "none"
  },
  tabsContainer: {},
  tabsContainerRTL: {
    float: "right"
  },
  tabIcon: {
    width: "24px",
    height: "24px",
    marginRight: "4px"
  },
  customTabsRoot: {
    minHeight: "unset !important"
  },
  customTabSelected: {
    backgroundColor: "rgba(" + hexToRgb(whiteColor) + ", 0.2)",
    transition: "background-color .4s"
  },
  customTabRoot: {
    width: "auto",
    minWidth: "70px",
    borderRadius: "3px",
    opacity: "1",
    height: "auto",
    padding: "10px 15px",
    display: "block",
    minHeight: "unset",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "24px"
  },
  customTabWrapper: {
    display: "inline-block",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    "& > svg": {
      verticalAlign: "middle",
      margin: "-1.55px 5px 0 0 !important"
    },
    "&,& *": {
      letterSpacing: "normal !important"
    }
  }
};

export default customTabsStyle;
