import {
  section,
  mrAuto,
  mlAuto,
  title,
  container,
  description,
  cardTitle,
  coloredShadow,
  blackColor,
  whiteColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const overviewStyle = {
  mrAuto,
  mlAuto,
  title,
  container,
  description: {
    ...description,
    marginBottom: "70px"
  },
  section: {
    ...section,
    padding: "70px 0px"
  },
  sectionTestimonials: {
    paddingTop: "50px",
    paddingBottom: "80px",
    textAlign: "center",
    "& $cardTitle": {
      marginTop: "0px"
    }
  },
  features5: {
    ...section,
    backgroundRepeat: "no-repeat",
    position: "relative",
    padding: "80px 0px",
    textAlign: "center",
    "& $title": {
      zIndex: "2",
      position: "relative",
      marginBottom: "30px",
      color: whiteColor
    },
    "& p": {
      color: whiteColor
    },
    "&:after": {
      background: "rgba(" + hexToRgb(blackColor) + ",0.65)",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: "''",
      zIndex: "0",
      left: "0px",
      top: "0px"
    }
  },
  features: {
    textAlign: "center",
    paddingTop: "30px",
    pddingBottom: "0px"
  },
  featuresShow: {
    zIndex: 3,
    border: "1px solid rgba(" + hexToRgb(whiteColor) + ",0.35)",
    borderTop: 0,
    borderBottom: 0,
    "&:last-of-type": {
      borderRight: 0
    },
    "&:first-of-type": {
      borderLeft: 0
    },
    "& h4,& p,& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      color: whiteColor
    },
    "& p": {
      lineHeight: "24px",
      fontSize: "16px"
    }
  },
  ourClients: {
    textAlign: "center",
    "& img": {
      width: "100%",
      maxWidth: "140px",
      margin: "0 auto",
      display: "inline-block"
    }
  },
  cardTitle: {
    ...cardTitle,
    marginTop: 0
  },
  cardDescription: {
    fontSize: "16px",
    lineHeight: "1.6em",
    color: grayColor[0]
  },
  coloredShadow,
  alignLeft: {
    textAlign: "left"
  }
};

export default overviewStyle;
