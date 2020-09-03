import {
  section,
  container,
  cardTitle,
  grayColor,
  roseColor,
  coloredShadow
} from "assets/jss/material-kit-pro-react.js";

const styles = {
  cardTitle,
  container,
  section: {
    ...section,
    padding: "70px 0px"
  },
  coloredShadow,
  cardDescription: {
    color: grayColor[0]
  },
  cardCategory: {
    marginTop: "10px"
  },
  textRose: {
    color: roseColor[0] + " !important"
  }
};

export default styles;
