import {
  primaryColor,
  primaryBoxShadow,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const customSelectStyle = {
  select: {
    padding: "12px 0 7px",
    fontSize: ".75rem",
    fontWeight: "400",
    lineHeight: "1.42857",
    textDecoration: "none",
    textTransform: "uppercase",
    color: grayColor[1],
    letterSpacing: "0",
    "&:focus": {
      backgroundColor: "transparent"
    },
    "&[aria-owns] + input + svg": {
      transform: "rotate(180deg)"
    },
    "& + input + svg": {
      transition: "all 300ms linear"
    }
  },
  selectFormControl: {
    margin: "10px 1px 10px 0px !important",
    "& > div": {
      "&:before": {
        borderBottomWidth: "1px !important",
        borderBottomColor: grayColor[11] + " !important"
      },
      "&:after": {
        borderBottomColor: primaryColor[0] + "!important"
      }
    }
  },
  selectLabel: {
    fontSize: "12px",
    textTransform: "uppercase",
    color: grayColor[1] + " !important",
    top: "8px"
  },
  selectMenu: {
    "& > div > ul": {
      border: "0",
      padding: "5px 0",
      margin: "0",
      boxShadow: "none",
      minWidth: "100%",
      borderRadius: "4px",
      boxSizing: "border-box",
      display: "block",
      fontSize: "14px",
      textAlign: "left",
      listStyle: "none",
      backgroundColor: whiteColor,
      backgroundClip: "padding-box"
    },
    "& $selectPaper $selectMenuItemSelectedMultiple": {
      backgroundColor: "inherit"
    }
  },
  selectMenuItem: {
    fontSize: "13px",
    padding: "10px 20px",
    margin: "0 5px",
    borderRadius: "2px",
    transition: "all 150ms linear",
    display: "block",
    clear: "both",
    fontWeight: "400",
    lineHeight: "2",
    whiteSpace: "nowrap",
    color: grayColor[8],
    paddingRight: "30px",
    "&:hover": {
      backgroundColor: primaryColor[0],
      color: whiteColor,
      ...primaryBoxShadow
    }
  },
  selectMenuItemSelected: {
    backgroundColor: primaryColor[0] + "!important",
    color: whiteColor
  },
  selectMenuItemSelectedMultiple: {
    "&:hover": {
      backgroundColor: primaryColor[0] + "!important",
      color: whiteColor,
      ...primaryBoxShadow,
      "&:after": {
        color: whiteColor
      }
    },
    "&:after": {
      top: "16px",
      right: "12px",
      width: "12px",
      height: "5px",
      borderLeft: "2px solid currentColor",
      transform: "rotate(-45deg)",
      opacity: "1",
      color: grayColor[1],
      position: "absolute",
      content: "''",
      borderBottom: "2px solid currentColor",
      transition: "opacity 90ms cubic-bezier(0,0,.2,.1)"
    }
  },
  selectPaper: {
    boxSizing: "borderBox",
    borderRadius: "4px",
    padding: "0",
    minWidth: "100%",
    display: "block",
    border: "0",
    boxShadow: "0 2px 5px 0 rgba(" + hexToRgb(blackColor) + ", 0.26)",
    backgroundClip: "padding-box",
    margin: "2px 0 0",
    fontSize: "14px",
    textAlign: "left",
    listStyle: "none",
    backgroundColor: "transparent",
    maxHeight: "266px"
  }
};

export default customSelectStyle;
