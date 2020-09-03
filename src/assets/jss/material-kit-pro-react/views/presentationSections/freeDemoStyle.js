import {
  title,
  description,
  section,
  container,
  mlAuto,
  mrAuto,
  cardTitle,
  card,
  dangerColor,
  successColor,
  blackColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const freeDemoStyle = {
  container,
  mlAuto,
  mrAuto,
  description,
  cardTitle,
  title: {
    ...title,
    marginTop: "15px",
    marginBottom: "1rem"
  },
  section: {
    ...section,
    padding: "70px 0px"
  },
  iconGithub: {
    fontSize: "82px",
    color: grayColor[10]
  },
  iframeGithub: {
    top: "11px",
    display: "inline-block",
    position: "relative",
    marginLeft: "10px"
  },
  card: {
    ...card,
    border: "0px",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ",0.87)",
    width: "100%",
    "& ul": {
      listStyle: "none",
      padding: "0px",
      maxWidth: "240px",
      margin: "10px auto"
    },
    "& ul li": {
      color: grayColor[0],
      padding: "12px 0px",
      borderBottom: "1px solid rgba(" + hexToRgb(grayColor[0]) + ",0.3)",
      textAlign: "left"
    },
    "& ul li b": {
      minWidth: "24px",
      display: "inline-block",
      textAlign: "center",
      color: grayColor[1]
    }
  },
  cardPricing: {
    boxShadow: "none"
  },
  cardIcons: {
    top: "6px",
    position: "relative"
  },
  dangerColor: {
    color: dangerColor[0]
  },
  successColor: {
    color: successColor[0]
  }
};

export default freeDemoStyle;
