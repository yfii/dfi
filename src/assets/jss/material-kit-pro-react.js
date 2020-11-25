// ##############################
// // // Function that converts from hex color to rgb color
// // // Example: input = #9c27b0 => output = 156, 39, 176
// // // Example: input = 9c27b0 => output = 156, 39, 176
// // // Example: input = #999 => output = 153, 153, 153
// // // Example: input = 999 => output = 153, 153, 153
// #############################
const hexToRgb = input => {
  input = input + '';
  input = input.replace('#', '');
  let hexRegex = /[0-9A-Fa-f]/g;
  if (!hexRegex.test(input) || (input.length !== 3 && input.length !== 6)) {
    throw new Error('input is not a valid hex color.');
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
  return parseInt(first, 16) + ', ' + parseInt(second, 16) + ', ' + parseInt(last, 16);
};

// ##############################
// // // Variables - Styles that are used on more than one component
// #############################

const primaryColor = ['#000000', '#B9AEA5'];
const hoverColor = ['#EFE6DC'];

const secondaryColor = ['#FBF6F0', '#EFE6DC', '#DED9D5'];
const warningColor = ['#ff9800'];
const dangerColor = ['#f44336'];
const successColor = ['#78B288', '#5A8F69'];
const infoColor = ['#00acc1'];
const roseColor = ['#e91e63'];
const grayColor = [
  '#999',
  '#3C4858',
  '#eee',
  '#343434',
  '#585858',
  '#232323',
  '#ddd',
  '#6c757d',
  '#333',
  '#212121',
  '#777',
  '#D2D2D2',
  '#AAA',
  '#495057',
  '#e5e5e5',
  '#555',
  '#f9f9f9',
  '#ccc',
  '#444',
  '#f2f2f2',
  '#89229b',
  '#c0c1c2',
  '#9a9a9a',
  '#f5f5f5',
  '#505050',
  '#1f1f1f',
];
const whiteColor = '#FFF';
const blackColor = '#000';
const twitterColor = '#55acee';
const facebookColor = '#3b5998';
const googleColor = '#dd4b39';
const linkedinColor = '#0976b4';
const pinterestColor = '#cc2127';
const youtubeColor = '#e52d27';
const tumblrColor = '#35465c';
const behanceColor = '#1769ff';
const dribbbleColor = '#ea4c89';
const redditColor = '#ff4500';
const instagramColor = '#125688';

const transition = {
  transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',
};

const containerFluid = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
};
const container = {
  ...containerFluid,
  '@media (min-width: 576px)': {
    maxWidth: '540px',
  },
  '@media (min-width: 768px)': {
    maxWidth: '720px',
  },
  '@media (min-width: 992px)': {
    width: '75%',
    maxWidth: '960px',
  },
  '@media (min-width: 1230px)': {
    width: '70%',
    maxWidth: '1230px',
  },
};

const boxShadow = {
  boxShadow: 'none',
};
const primaryBoxShadow = {
  boxShadow: 'none',
};
const infoBoxShadow = {
  boxShadow: 'none',
};
const successBoxShadow = {
  boxShadow: 'none',
};
const warningBoxShadow = {
  boxShadow: 'none',
};
const dangerBoxShadow = {
  boxShadow: 'none',
};
const roseBoxShadow = {
  boxShadow: 'none',
};
const defaultBoxShadow = {
  border: '0',
  borderRadius: '3px',
  boxShadow:
    '0 10px 20px -12px rgba(' +
    hexToRgb(blackColor) +
    ', 0.42), 0 3px 20px 0px rgba(' +
    hexToRgb(blackColor) +
    ', 0.12), 0 8px 10px -5px rgba(' +
    hexToRgb(blackColor) +
    ', 0.2)',
  padding: '10px 0',
  transition: 'all 150ms ease 0s',
};

const title = {
  color: grayColor[1],
  textDecoration: 'none',
  fontWeight: '700',
  marginTop: '30px',
  marginBottom: '25px',
  minHeight: '32px',
  fontFamily: `"Roboto Slab", "Times New Roman", serif`,
};

const mlAuto = {
  marginLeft: 'auto',
};

export {
  transition,
  container,
  containerFluid,
  boxShadow,
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
  defaultBoxShadow,
  title,
  mlAuto,
  hexToRgb,
};
