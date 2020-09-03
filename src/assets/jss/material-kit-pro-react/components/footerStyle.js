import {
  container,
  primaryColor,
  whiteColor,
  btnLink,
  grayColor,
  twitterColor,
  dribbbleColor,
  instagramColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const footerStyle = {
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right"
  },
  rightLinks: {
    float: "right!important",
    "& ul": {
      marginBottom: 0,
      marginTop: 10,
      padding: 0,
      listStyle: "none",
      height: 38,
      "& li": {
        display: "inline-block"
      }
    },
    "& i": {
      fontSize: "20px"
    }
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    zIndex: "2",
    position: "relative",
    "& ul": {
      marginBottom: "0",
      padding: 0,
      listStyle: "none"
    }
  },
  big: {
    padding: "1.875rem 0",
    "& h5, & h4": {
      fontWeight: 700,
      fontFamily: "Roboto Slab,Times New Roman,serif",
      marginBottom: "15px"
    },
    "& p": {
      color: grayColor[0]
    }
  },
  content: {
    textAlign: "left"
  },
  a: {
    color: primaryColor[0],
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  dark: {
    background:
      "radial-gradient(ellipse at center," +
      grayColor[4] +
      " 0," +
      grayColor[5] +
      " 100%)",
    backgroundSize: "550% 450%",
    color: whiteColor,
    "& p": {
      color: grayColor[0]
    },
    "& i": {
      color: whiteColor
    },
    "& a": {
      color: whiteColor,
      opacity: ".86",
      "&:visited": {
        color: whiteColor
      },
      "&:focus, &:hover": {
        opacity: 1
      }
    },
    "& hr": {
      borderColor: "rgba(" + hexToRgb(whiteColor) + ",0.2)"
    },
    "& $btnTwitter, & $btnDribbble, & $btnInstagram": {
      color: whiteColor
    }
  },
  white: {
    backgroundColor: whiteColor,
    color: grayColor[1],
    textDecoration: "none",
    "& a": {
      "&:visited": {
        color: grayColor[1]
      },
      "&:hover, &:focus": {
        color: grayColor[20]
      }
    }
  },
  container,
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  },
  iconSocial: {
    width: "41px",
    height: "41px",
    fontSize: "24px",
    minWidth: "41px",
    padding: 0,
    overflow: "hidden",
    position: "relative"
  },
  btnTwitter: {
    ...btnLink,
    color: twitterColor
  },
  btnDribbble: {
    ...btnLink,
    color: dribbbleColor
  },
  btnInstagram: {
    ...btnLink,
    color: instagramColor
  },
  footerBrand: {
    height: "50px",
    padding: "15px 15px",
    fontSize: "18px",
    lineHeight: "50px",
    marginLeft: "-15px",
    color: grayColor[1],
    textDecoration: "none",
    fontWeight: 700,
    fontFamily: "Roboto Slab,Times New Roman,serif"
  },
  pullCenter: {
    display: "inline-block",
    float: "none"
  },
  clearFix: {
    clear: "both"
  }
};
export default footerStyle;
