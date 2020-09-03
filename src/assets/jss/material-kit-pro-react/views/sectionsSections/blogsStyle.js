import {
  container,
  title,
  cardTitle,
  coloredShadow,
  description,
  mlAuto,
  mrAuto,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const blogsSection = {
  container,
  title,
  coloredShadow,
  cardTitle,
  mlAuto,
  mrAuto,
  description,
  blog: {
    padding: "50px 0"
  },
  cardCategory: {
    marginBottom: "0",
    marginTop: "10px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      position: "relative",
      top: "8px",
      lineHeight: "0"
    }
  },
  description1: {
    ...description,
    lineHeight: "1.313rem"
  },
  author: {
    "& a": {
      color: grayColor[1],
      textDecoration: "none"
    }
  },
  card: {
    marginBottom: "80px"
  },
  card4: {
    marginBottom: "60px",
    textAlign: "center"
  }
};

export default blogsSection;
