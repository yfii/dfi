import {
  cardTitle,
  title,
  grayColor
} from "assets/jss/material-kit-pro-react.js";
import imagesStyle from "assets/jss/material-kit-pro-react/imagesStyles.js";

const teamStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  cardTitle,
  smallTitle: {
    color: grayColor[7]
  },
  description: {
    color: grayColor[0]
  },
  justifyCenter: {
    justifyContent: "center !important"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: grayColor[0]
  },
  margin5: {
    margin: "5px"
  },
  card3: {
    textAlign: "center"
  }
};

export default teamStyle;
