import {
  container,
  title,
  mlAuto,
  blackColor,
  grayColor,
  hexToRgb
} from "assets/jss/material-kit-pro-react.js";

const reusableStylesForImgs = {
  position: "absolute",
  boxShadow:
    "0 8px 10px 1px rgba(" +
    hexToRgb(blackColor) +
    ", 0.14), 0 3px 14px 2px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 5px 5px -3px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)"
};

const componentsStyle = theme => ({
  container,
  mlAuto,
  title: {
    ...title,
    marginBottom: "5px",
    marginTop: "60px",
    "& + $description": {
      marginTop: "5px",
      marginBottom: "30px"
    }
  },
  description: {
    color: grayColor[0]
  },
  imageContainer: {
    height: "560px",
    position: "relative"
  },
  componentsMacbook: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "850px!important",
      maxHeight: "480px!important",
      marginTop: "12vh",
      left: "-12px"
    },
    [theme.breakpoints.down(768)]: {
      maxWidth: "350px!important",
      maxHeight: "250px!important",
      marginTop: "12vh",
      left: "-12px"
    },
    width: "auto",
    left: "-100px",
    top: 0,
    height: "100%",
    position: "absolute"
  },
  shoppingCart: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
    ...reusableStylesForImgs,
    left: "-13%",
    top: "27%",
    height: "175px",
    borderRadius: "2px",
    WebkitAnimation: "Floatingx 14s ease-in-out infinite",
    float: "left"
  },
  shareButton: {
    [theme.breakpoints.down("md")]: {
      top: "12%"
    },
    [theme.breakpoints.down("sm")]: {
      top: "7%"
    },
    ...reusableStylesForImgs,
    left: "3%",
    top: "-3%",
    height: "25px",
    WebkitAnimation: "Floatingy 11s ease-in-out infinite"
  },
  cardImage: {
    [theme.breakpoints.down("md")]: {
      top: "-2%",
      left: "65%"
    },
    [theme.breakpoints.down("sm")]: {
      top: "-2%"
    },
    ...reusableStylesForImgs,
    left: "35%",
    top: "2%",
    height: "125px",
    borderRadius: "6px",
    WebkitAnimation: "Floatingy 18s ease-in-out infinite"
  },
  twitterImage: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    },
    ...reusableStylesForImgs,
    left: "90%",
    top: "11%",
    height: "90px",
    borderRadius: "2px",
    WebkitAnimation: "Floatingy 10s ease-in-out infinite"
  },
  iconsImage: {
    [theme.breakpoints.down("md")]: {
      left: "47%",
      top: "37%"
    },
    [theme.breakpoints.down("sm")]: {
      left: "-7%",
      top: "37%"
    },
    ...reusableStylesForImgs,
    left: "70%",
    top: "67%",
    height: "40px",
    WebkitAnimation: "Floatingx 16s ease-in-out infinite"
  },
  repostImage: {
    [theme.breakpoints.down("md")]: {
      top: "54%"
    },
    ...reusableStylesForImgs,
    left: "0%",
    top: "68%",
    height: "25px",
    borderRadius: "3px",
    WebkitAnimation: "Floatingy 15s ease-in-out infinite"
  }
});

export default componentsStyle;
