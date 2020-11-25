import {
  container,
  title,
  main,
  whiteColor,
  grayColor,
  mainRaised,
  hexToRgb,
} from 'assets/jss/material-kit-pro-react.js';
import footerStyle from 'assets/jss/material-kit-pro-react/views/componentsSections/footerStyle.js';

const presentationStyle = {
  ...footerStyle,
  main: {
    ...main,
    /*overflow: "hidden"*/
  },
  mainRaised,
  container: {
    ...container,
    zIndex: 1,
  },
  title: {
    ...title,
    color: whiteColor,
  },
  brand: {
    color: whiteColor,
    textAlign: 'center',
    '& h1': {
      fontSize: '4.2rem',
      fontWeight: '600',
      display: 'inline-block',
      position: 'relative',
    },
  },
};

export default presentationStyle;
