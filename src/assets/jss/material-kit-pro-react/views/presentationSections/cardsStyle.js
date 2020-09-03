import {
  container,
  section,
  sectionDark,
  sectionDescription,
  title,
  whiteColor,
  mlAuto,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const cardsStyle = {
  section: {
    ...section,
    padding: "50px 0px"
  },
  sectionDark,
  container,
  sectionDescription,
  title: {
    ...title,
    color: whiteColor,
    marginTop: "30px",
    marginBottom: "25px",
    minHeight: "32px"
  },
  description: {
    color: "rgba(" + hexToRgb(whiteColor) + ",0.76)"
  },
  imageContainer: {
    maxWidth: "1040px",
    marginTop: "-140px",
    position: "relative",
    height: "660px",
    "& img": {
      maxWidth: "1040px",
      width: "auto",
      position: "absolute",
      right: "0px",
      top: "0px"
    }
  },
  mlAuto
};

export default cardsStyle;
