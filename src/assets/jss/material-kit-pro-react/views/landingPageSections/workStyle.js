import {
  title,
  mrAuto,
  mlAuto,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const workStyle = {
  mrAuto,
  mlAuto,
  section: {
    padding: "70px 0"
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center"
  },
  description: {
    color: grayColor[0],
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  }
};

export default workStyle;
