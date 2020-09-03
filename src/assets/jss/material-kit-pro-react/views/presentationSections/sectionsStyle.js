import {
  section,
  container,
  containerFluid,
  title,
  description,
  mlAuto,
  mrAuto,
  blackColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const sectionStyle = {
  sectionSections: {
    ...section,
    padding: "70px 0px",
    paddingBottom: "0px",
    marginBottom: "-35px",
    "& img": {
      width: "100%",
      borderRadius: "3px",
      boxShadow:
        "0 8px 10px 1px rgba(" +
        hexToRgb(blackColor) +
        ",0.14), 0 3px 14px 2px rgba(" +
        hexToRgb(blackColor) +
        ",0.12), 0 5px 5px -3px rgba(" +
        hexToRgb(blackColor) +
        ",0.2)",
      transition: "all .2s cubic-bezier(0.4,0,0.2,1)",
      "&:hover": {
        transform: "scale(1.02)"
      }
    }
  },
  container,
  containerFluid,
  sectionDescription: {
    textAlign: "center",
    marginBottom: "60px"
  },
  title,
  description,
  mlAuto,
  mrAuto,
  photoGallery: {
    padding: "7.5px"
  }
};

export default sectionStyle;
