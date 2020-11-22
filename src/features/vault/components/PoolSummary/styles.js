import { primaryColor, secondaryColor, hoverColor } from 'assets/jss/material-kit-pro-react.js';

const styles = theme => ({
  iconContainerMainTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: primaryColor[0],
    lineHeight: '18px',
    letterSpacing: 0,
  },
  iconContainerSubTitle: {
    fontSize: '14px',
    fontWeight: '400',
    color: primaryColor[0],
    lineHeight: '14px',
    opacity: '0.4',
    letterSpacing: 0,
  },
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
});

export default styles;
