import {
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  blackColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const cardHeaderStyle = {
  cardHeader: {
    borderRadius: "3px",
    padding: "1rem 15px",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "-30px",
    border: "0",
    marginBottom: "0"
  },
  cardHeaderPlain: {
    marginLeft: "0px",
    marginRight: "0px",
    "&$cardHeaderImage": {
      margin: "0 !important"
    }
  },
  cardHeaderImage: {
    position: "relative",
    padding: "0",
    zIndex: "1",
    marginLeft: "15px",
    marginRight: "15px",
    marginTop: "-30px",
    borderRadius: "6px",
    "& img": {
      width: "100%",
      borderRadius: "6px",
      pointerEvents: "none",
      boxShadow:
        "0 5px 15px -8px rgba(" +
        hexToRgb(blackColor) +
        ", 0.24), 0 8px 10px -5px rgba(" +
        hexToRgb(blackColor) +
        ", 0.2)"
    },
    "& a": {
      display: "block"
    }
  },
  noShadow: {
    "& img": {
      boxShadow: "none !important"
    }
  },
  cardHeaderContact: {
    margin: "0 15px",
    marginTop: "-20px"
  },
  cardHeaderSignup: {
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    width: "100%",
    marginBottom: "15px"
  },
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader
};

export default cardHeaderStyle;
