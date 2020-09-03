import {
  whiteColor,
  hexToRgb,
  cardTitle
} from "assets/jss/material-kit-pro-react.js";

import tooltipsStyle from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const sectionPillsStyle = {
  ...tooltipsStyle,
  section: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0"
  },
  textCenter: {
    textAlign: "center"
  },
  category: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.7) !important",
    marginTop: "10px"
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor + "  !important"
  },
  icons: {
    width: "1.1rem",
    height: "1.1rem",
    position: "relative",
    display: "inline-block",
    top: "0",
    marginTop: "-1em",
    marginBottom: "-1em",
    marginRight: "4px",
    verticalAlign: "middle"
  },
  tabSpace: {
    padding: "20px 0 50px"
  }
};

export default sectionPillsStyle;
