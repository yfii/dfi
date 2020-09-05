/*!

=========================================================
* Material Kit PRO React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
const hexToRgb = input => {
  input = input + "";
  input = input.replace("#", "");
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error("input is not a valid hex color.");
  }
  if (input.length === 3) {
    let first = input[0];
    let second = input[1];
    let last = input[2];
    input = first + first + second + second + last + last;
  }
  input = input.toUpperCase(input);
  let first = input[0] + input[1];
  let second = input[2] + input[3];
  let last = input[4] + input[5];
  return (
    parseInt(first, 16) +
    ", " +
    parseInt(second, 16) +
    ", " +
    parseInt(last, 16)
  );
};

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const drawerWidth = 260;

const primaryColor = [
  "#ff2d82",
  "#9c27b0",
  "#ab47bc",
  "#8e24aa",
  "#af2cc5",
  "#e1bee7",
  "#ba68c8"
];


const hoverColor = [
  "#ff5b9e",
  "#404456"
];

const secondaryColor = ["#fafafa"];
const warningColor = [
  "#ff9800",
  "#ffa726",
  "#fb8c00",
  "#ffa21a",
  "#fcf8e3",
  "#faf2cc",
  "#ffe0b2",
  "#ffb74d"
];
const dangerColor = [
  "#f44336",
  "#ef5350",
  "#e53935",
  "#f55a4e",
  "#f2dede",
  "#ebcccc",
  "ef9a9a",
  "#ef5350"
];
const successColor = [
  "#4caf50",
  "#66bb6a",
  "#43a047",
  "#5cb860",
  "#dff0d8",
  "#d0e9c6",
  "#a5d6a7",
  "#66bb6a"
];
const infoColor = [
  "#00acc1",
  "#26c6da",
  "#00acc1",
  "#00d3ee",
  "#d9edf7",
  "#c4e3f3",
  "#b2ebf2",
  "#4dd0e1"
];
const roseColor = ["#e91e63", "#ec407a", "#d81b60", "#f8bbd0", "#f06292"];
const grayColor = [
  "#999",
  "#3C4858",
  "#eee",
  "#343434",
  "#585858",
  "#232323",
  "#ddd",
  "#6c757d",
  "#333",
  "#212121",
  "#777",
  "#D2D2D2",
  "#AAA",
  "#495057",
  "#e5e5e5",
  "#555",
  "#f9f9f9",
  "#ccc",
  "#444",
  "#f2f2f2",
  "#89229b",
  "#c0c1c2",
  "#9a9a9a",
  "#f5f5f5",
  "#505050",
  "#1f1f1f"
];
const whiteColor = "#FFF";
const blackColor = "#000";
const twitterColor = "#55acee";
const facebookColor = "#3b5998";
const googleColor = "#dd4b39";
const linkedinColor = "#0976b4";
const pinterestColor = "#cc2127";
const youtubeColor = "#e52d27";
const tumblrColor = "#35465c";
const behanceColor = "#1769ff";
const dribbbleColor = "#ea4c89";
const redditColor = "#ff4500";
const instagramColor = "#125688";

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const containerFluid = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto",
  width: "100%"
};
const container = {
  ...containerFluid,
  "@media (min-width: 576px)": {
    maxWidth: "540px"
  },
  "@media (min-width: 768px)": {
    maxWidth: "720px"
  },
  "@media (min-width: 992px)": {
    maxWidth: "960px"
  },
  "@media (min-width: 1230px)": {
    maxWidth: "1230px"    // '1230px - 30px margin = 1200px', which is better in huge display
  }
};

const card = {
  display: "inline-block",
  position: "relative",
  width: "100%",
  margin: "25px 0",
  boxShadow: "0 1px 4px 0 rgba(" + hexToRgb(blackColor) + ", 0.14)",
  borderRadius: "3px",
  color: "rgba(" + hexToRgb(blackColor) + ", 0.87)",
  background: whiteColor
};

const defaultFont = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 4px 25px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)"
};
const primaryBoxShadow = {
  boxShadow:
    "0 12px 20px -10px rgba(" +
    hexToRgb(primaryColor[0]) +
    ", 0.28), 0 4px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 7px 8px -5px rgba(" +
    hexToRgb(primaryColor[0]) +
    ", 0.2)"
};
const infoBoxShadow = {
  boxShadow:
    "0 12px 20px -10px rgba(" +
    hexToRgb(infoColor[0]) +
    ", 0.28), 0 4px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 7px 8px -5px rgba(" +
    hexToRgb(infoColor[0]) +
    ", 0.2)"
};
const successBoxShadow = {
  boxShadow:
    "0 12px 20px -10px rgba(" +
    hexToRgb(successColor[0]) +
    ", 0.28), 0 4px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 7px 8px -5px rgba(" +
    hexToRgb(successColor[0]) +
    ", 0.2)"
};
const warningBoxShadow = {
  boxShadow:
    "0 12px 20px -10px rgba(" +
    hexToRgb(warningColor[0]) +
    ", 0.28), 0 4px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 7px 8px -5px rgba(" +
    hexToRgb(warningColor[0]) +
    ", 0.2)"
};
const dangerBoxShadow = {
  boxShadow:
    "0 12px 20px -10px rgba(" +
    hexToRgb(dangerColor[0]) +
    ", 0.28), 0 4px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 7px 8px -5px rgba(" +
    hexToRgb(dangerColor[0]) +
    ", 0.2)"
};
const roseBoxShadow = {
  boxShadow:
    "0 4px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.14), 0 7px 10px -5px rgba(" +
    hexToRgb(roseColor[0]) +
    ", 0.4)"
};

const warningCardHeader = {
  color: whiteColor,
  background:
    "linear-gradient(60deg, " + warningColor[1] + ", " + warningColor[2] + ")",
  ...warningBoxShadow
};
const successCardHeader = {
  color: whiteColor,
  background:
    "linear-gradient(60deg, " + successColor[1] + ", " + successColor[2] + ")",
  ...successBoxShadow
};
const dangerCardHeader = {
  color: whiteColor,
  background:
    "linear-gradient(60deg, " + dangerColor[1] + ", " + dangerColor[2] + ")",
  ...dangerBoxShadow
};
const infoCardHeader = {
  color: whiteColor,
  background:
    "linear-gradient(60deg, " + infoColor[1] + ", " + infoColor[2] + ")",
  ...infoBoxShadow
};
const primaryCardHeader = {
  color: whiteColor,
  background:
    "linear-gradient(60deg, " + primaryColor[1] + ", " + primaryColor[2] + ")",
  ...primaryBoxShadow
};
const roseCardHeader = {
  color: whiteColor,
  background:
    "linear-gradient(60deg, " + roseColor[1] + ", " + roseColor[2] + ")",
  ...roseBoxShadow
};
const cardActions = {
  margin: "0 20px 10px",
  paddingTop: "10px",
  borderTop: "1px solid  " + grayColor[2],
  height: "auto",
  ...defaultFont
};

const cardHeader = {
  margin: "-30px 15px 0",
  borderRadius: "3px",
  padding: "15px"
};

const defaultBoxShadow = {
  border: "0",
  borderRadius: "3px",
  boxShadow:
    "0 10px 20px -12px rgba(" +
    hexToRgb(blackColor) +
    ", 0.42), 0 3px 20px 0px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)",
  padding: "10px 0",
  transition: "all 150ms ease 0s"
};

const title = {
  color: grayColor[1],
  textDecoration: "none",
  fontWeight: "700",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: `"Roboto Slab", "Times New Roman", serif`
};

const cardTitle = {
  "&, & a": {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const cardLink = {
  "& + $cardLink": {
    marginLeft: "1.25rem"
  }
};

const cardSubtitle = {
  marginBottom: "0",
  marginTop: "-.375rem"
};

const main = {
  background: whiteColor,
  position: "relative",
  zIndex: "3"
};

const mainRaised = {
  "@media (max-width: 576px)": {
    marginTop: "-30px"
  },
  "@media (max-width: 830px)": {
    marginLeft: "10px",
    marginRight: "10px"
  },
  margin: "-60px 30px 0px",
  borderRadius: "6px",
  boxShadow:
    "0 16px 24px 2px rgba(" +
    hexToRgb(blackColor) +
    ", 0.14), 0 6px 30px 5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb(blackColor) +
    ", 0.2)"
};

const section = {
  backgroundPosition: "50%",
  backgroundSize: "cover"
};

const sectionDark = {
  backgroundColor: grayColor[3],
  background:
    "radial-gradient(ellipse at center," +
    grayColor[4] +
    " 0," +
    grayColor[5] +
    " 100%)"
};

const sectionDescription = {
  marginTop: "130px"
};

const description = {
  color: grayColor[0]
};

const mlAuto = {
  marginLeft: "auto"
};

const mrAuto = {
  marginRight: "auto"
};

const btnLink = {
  backgroundColor: "transparent",
  boxShdow: "none",
  marginTop: "5px",
  marginBottom: "5px"
};
const coloredShadow = {
  // some jss/css to make the cards look a bit better on Internet Explorer
  "@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)": {
    display: "none !important"
  },
  transform: "scale(0.94)",
  top: "12px",
  filter: "blur(12px)",
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  zIndex: "-1",
  transition: "opacity .45s",
  opacity: "0"
};

export {
  //variables
  drawerWidth,
  transition,
  container,
  containerFluid,
  boxShadow,
  card,
  defaultFont,
  primaryColor,
  hoverColor,
  secondaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  whiteColor,
  blackColor,
  twitterColor,
  facebookColor,
  googleColor,
  linkedinColor,
  pinterestColor,
  youtubeColor,
  tumblrColor,
  behanceColor,
  dribbbleColor,
  redditColor,
  instagramColor,
  primaryBoxShadow,
  infoBoxShadow,
  successBoxShadow,
  warningBoxShadow,
  dangerBoxShadow,
  roseBoxShadow,
  warningCardHeader,
  successCardHeader,
  dangerCardHeader,
  infoCardHeader,
  primaryCardHeader,
  roseCardHeader,
  cardActions,
  cardHeader,
  defaultBoxShadow,
  title,
  cardTitle,
  description,
  cardLink,
  cardSubtitle,
  main,
  mainRaised,
  section,
  sectionDark,
  sectionDescription,
  mlAuto,
  mrAuto,
  btnLink,
  coloredShadow,
  hexToRgb
};
