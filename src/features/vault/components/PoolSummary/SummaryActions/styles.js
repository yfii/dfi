import { primaryColor, secondaryColor, hoverColor } from 'assets/jss/material-kit-pro-react.js';

const styles = {
  iconContainerSecond: {
    width: '48px',
    height: '48px',
    backgroundColor: secondaryColor[0],
    borderRadius: '8px',
    color: primaryColor[0],

    '& i': {
      fontSize: '24px',
    },
    '&:hover,&:focus': {
      backgroundColor: hoverColor[0],
    },
  },
  iconContainerPrimary: {
    width: '48px',
    height: '48px',
    backgroundColor: secondaryColor[0],
    border: '2px',
    borderColor: primaryColor[0],
    borderRadius: '8px',
    color: '#fff',
    '& i': {
      fontSize: '24px',
    },
    '&:hover,&:focus': {
      background: hoverColor[0],
    },
  },
};

export default styles;
