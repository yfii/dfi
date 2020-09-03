import {
  whiteColor,
  blackColor,
  primaryColor,
  roseColor,
  infoColor,
  warningColor,
  dangerColor,
  successColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const style = {
  rotatingCardContainer: {
    perspective: "800px",
    "& $cardRotate $back": {
      transform: "rotateY(180deg)",
      zIndex: "5",
      textAlign: "center",
      width: "100%",
      height: "100%"
    },
    "&:not($manualRotate):hover $cardRotate": {
      transform: "rotateY(180deg)"
    },
    "&$manualRotate$activateRotate $cardRotate": {
      transform: "rotateY(180deg)"
    },
    "& $cardRotate $front": {
      zIndex: "2",
      position: "relative"
    },
    "& $cardRotate $front, & $cardRotate $back": {
      backfaceVisibility: "hidden",
      boxShadow:
        "0 2px 2px 0 rgba(" +
        hexToRgb(blackColor) +
        ", 0.14), 0 3px 1px -2px rgba(" +
        hexToRgb(blackColor) +
        ", 0.12), 0 1px 5px 0 rgba(" +
        hexToRgb(blackColor) +
        ", 0.2)",
      position: "absolute",
      backgroundColor: whiteColor,
      borderRadius: "6px",
      top: "0",
      left: "0",
      WebkitBoxPack: "center",
      MsFlexPack: "center",
      justifyContent: "center",
      MsFlexLinePack: "center",
      alignContent: "center",
      display: "flex",
      WebkitBoxOrient: "vertical",
      WebkitBoxDirection: "normal",
      flexDirection: "column"
    }
  },
  activateRotate: {},
  manualRotate: {},
  cardRotate: {
    transition: "all 0.8s cubic-bezier(0.34, 1.45, 0.7, 1)",
    transformStyle: "preserve-3d",
    position: "relative",
    background: "transparent"
  },
  front: {},
  back: {},
  wrapperBackground: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    textAlign: "center",
    "&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.56)",
      borderRadius: "6px"
    }
  },
  cardBodyRotate: {
    WebkitBoxPack: "center",
    MsFlexPack: "center",
    justifyContent: "center",
    MsFlexLinePack: "center",
    alignContent: "center",
    display: "flex",
    WebkitBoxOrient: "vertical",
    WebkitBoxDirection: "normal",
    flexDirection: "column"
  },
  wrapperPrimary: {
    background:
      "linear-gradient(60deg," + primaryColor[1] + "," + primaryColor[2] + ")",
    "& h1 small": {
      color: "rgba(" + hexToRgb(whiteColor) + ", 0.8)"
    },
    color: whiteColor
  },
  wrapperInfo: {
    background:
      "linear-gradient(60deg," + infoColor[1] + "," + infoColor[2] + ")",
    color: whiteColor
  },
  wrapperSuccess: {
    background:
      "linear-gradient(60deg," + successColor[1] + "," + successColor[2] + ")",
    color: whiteColor
  },
  wrapperWarning: {
    background:
      "linear-gradient(60deg," + warningColor[1] + "," + warningColor[2] + ")",
    color: whiteColor
  },
  wrapperDanger: {
    background:
      "linear-gradient(60deg," + dangerColor[1] + "," + dangerColor[2] + ")",
    color: whiteColor
  },
  wrapperRose: {
    background:
      "linear-gradient(60deg," + roseColor[1] + "," + roseColor[2] + ")",
    color: whiteColor
  }
};

export default style;
