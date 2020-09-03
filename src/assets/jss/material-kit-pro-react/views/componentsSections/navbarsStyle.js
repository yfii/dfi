import { container, title } from "assets/jss/material-kit-pro-react.js";
import headerLinksStyle from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

const navbarsStyle = theme => ({
  container,
  ...headerLinksStyle(theme),
  section: {
    padding: "70px 0",
    paddingBottom: "0"
  },
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  navbar: {
    marginBottom: "-20px",
    zIndex: "100",
    position: "relative",
    overflow: "hidden",
    "& header": {
      borderRadius: "0",
      zIndex: "unset"
    }
  },
  navigation: {
    backgroundPosition: "50%",
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "740px"
  },
  formControl: {
    margin: "0 !important",
    paddingTop: "7px",
    paddingBottom: "7px"
  },
  inputRootCustomClasses: {
    margin: "0!important"
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: "inherit"
  },
  img: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },
  imageDropdownButton: {
    padding: "0px",
    borderRadius: "50%",
    marginLeft: "5px"
  }
});

export default navbarsStyle;
