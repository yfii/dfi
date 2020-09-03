import {
  section,
  container,
  mlAuto,
  mrAuto,
  title,
  description,
  card,
  blackColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const pricingStyle = {
  container,
  mlAuto,
  mrAuto,
  title,
  section: {
    ...section,
    padding: "80px 0",
    zIndex: 3,
    position: "relative",
    textAlign: "center"
  },
  socialLine: {
    padding: ".9375rem 0px",
    textAlign: "center",
    width: "100%"
  },
  marginRight: {
    marginRight: "3px"
  },
  description: {
    ...description,
    color: grayColor[0]
  },
  card: {
    ...card,
    marginBottom: "30px",
    boxShadow:
      "0 2px 2px 0 rgba(" +
      hexToRgb(blackColor) +
      ",0.14), 0 3px 1px -2px rgba(" +
      hexToRgb(blackColor) +
      ",0.2), 0 1px 5px 0 rgba(" +
      hexToRgb(blackColor) +
      ",0.12)",
    "& ul": {
      listStyle: "none",
      padding: 0,
      maxWidth: "240px",
      margin: "10px auto"
    },
    "& ul li": {
      color: grayColor[0],
      textAlign: "center",
      padding: "12px 0px",
      borderBottom: "1px solid rgba(" + hexToRgb(grayColor[0]) + ",0.3)"
    },
    "& ul li b": {
      color: grayColor[1]
    },
    "& ul li:last-child": {
      border: 0
    }
  },
  cardMargin: {
    marginTop: "80px"
  },
  cardCategory: {
    color: grayColor[0],
    marginTop: "10px"
  },
  cardTitle: {
    marginTop: "30px",
    color: grayColor[1],
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: "Roboto Slab,Times New Roman,serif",
    "& small": {
      position: "relative",
      top: "-17px",
      fontSize: "26px",
      display: "inline-flex",
      height: 0
    }
  },
  cardBody: {
    padding: "15px"
  },
  navPillsContent: {
    padding: "20px 0px 50px 0px"
  }
};

export default pricingStyle;
