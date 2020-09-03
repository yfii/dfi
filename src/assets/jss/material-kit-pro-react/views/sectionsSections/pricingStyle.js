import {
  container,
  section,
  sectionDark,
  mlAuto,
  mrAuto,
  title,
  description,
  cardTitle,
  roseColor,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const pricingSection = {
  container,
  mlAuto,
  mrAuto,
  title,
  cardTitle,
  description,
  cardTitleWhite: {
    ...cardTitle,
    color: whiteColor + "  !important"
  },
  sectionGray: {
    background: grayColor[14]
  },
  section: {
    ...section,
    ...sectionDark,
    position: "relative",
    "& $container": {
      position: "relative",
      zIndex: "2"
    },
    "& $description": {
      color: "rgba(" + hexToRgb(whiteColor) + ", 0.5)"
    },
    "& $cardCategory": {
      color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)"
    },
    "& $title": {
      color: whiteColor,
      marginBottom: "10px"
    },
    "&:after": {
      position: "absolute",
      zIndex: "1",
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''",
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.7)"
    }
  },
  pricing1: {
    "&$section:after": {
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.8)"
    }
  },
  pricing: {
    padding: "80px 0"
  },
  textCenter: {
    textAlign: "center"
  },
  sectionSpace: {
    height: "70px",
    display: "block"
  },
  cardCategory: {
    ...description
  },
  cardCategoryWhite: {
    color: whiteColor
  },
  cardDescription: {
    ...description
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  icon: {
    color: "rgba(" + hexToRgb(whiteColor) + ", 0.76)",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid " + grayColor[14],
    borderRadius: "50%",
    lineHeight: "174px",
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      fontSize: "55px",
      lineHeight: "55px"
    },
    "& svg": {
      width: "55px",
      height: "55px"
    }
  },
  iconWhite: {
    color: whiteColor
  },
  iconRose: {
    color: roseColor[0]
  },
  marginTop30: {
    marginTop: "30px"
  },
  marginBottom20: {
    marginBottom: "20px"
  },
  marginBottom30: {
    marginBottom: "30px"
  }
};

export default pricingSection;
