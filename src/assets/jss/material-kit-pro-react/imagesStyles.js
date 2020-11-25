import { blackColor, hexToRgb } from 'assets/jss/material-kit-pro-react.js';

const imagesStyles = {
  imgFluid: {
    maxWidth: '100%',
    height: 'auto',
  },
  imgRounded: {
    borderRadius: '6px !important',
  },
  imgRoundedCircle: {
    borderRadius: '50% !important',
  },
  imgRaised: {
    boxShadow:
      '0 5px 15px -8px rgba(' +
      hexToRgb(blackColor) +
      ', 0.24), 0 8px 10px -5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.2)',
  },
  imgGallery: {
    width: '100%',
    marginBottom: '2.142rem',
  },
};

export default imagesStyles;
