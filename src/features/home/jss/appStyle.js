import { container } from "assets/jss/material-kit-pro-react.js";

const appStyle = theme => ({
  page: {
    backgroundColor: "#232733",
    minHeight: "100vh"
  },
  container: {
    ...container,
    zIndex: 1,
  },
  children:{
    minHeight:'77vh',
  }
});

export default appStyle;
