import {
  title,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

const sectionTitleStyle = theme => ({
  root: {
    flexGrow: 1,
    alignItems: "center"
  },
  title: {
    ...title,
    fontSize: "1.5rem",
    lineHeight: 1.2,
    color: grayColor,
  },
  textCenter: {
    textAlign: "center",
  }
});

export default sectionTitleStyle;
