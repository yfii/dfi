import {
  section,
  container,
  cardTitle,
  coloredShadow,
  grayColor,
  dangerColor,
  mlAuto
} from "assets/jss/material-kit-pro-react.js";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const styles = {
  cardTitle,
  container,
  ...tooltipsStyle,
  section: {
    ...section,
    padding: "70px 0px"
  },
  coloredShadow,
  cardDescription: {
    color: grayColor[0],
    textAlign: "center"
  },
  mlAuto,
  priceContainer: {
    display: "inline-flex"
  },
  price: {
    fontSize: "18px",
    color: grayColor[22]
  },
  priceOld: {
    fontSize: "16px",
    textDecoration: "line-through"
  },
  priceNew: {
    color: dangerColor[0]
  },
  stats: {
    color: grayColor[0]
  },
  textCenter: {
    textAlign: "center"
  }
};

export default styles;
