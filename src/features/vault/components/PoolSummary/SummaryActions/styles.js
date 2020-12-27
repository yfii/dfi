import { primaryColor } from 'assets/jss/material-kit-pro-react.js';

const styles = (theme) => ({
  iconContainerSecond: {
    width: '48px',
    height: '48px',
    backgroundColor: theme.palette.background.primary,
    borderRadius: '8px',
    color: theme.palette.text.primary,

    '& i': {
      fontSize: '24px',
    },
    '&:hover,&:focus': {
      backgroundColor: theme.palette.background.hover,
    },
  },
  iconContainerPrimary: {
    width: '48px',
    height: '48px',
    backgroundColor: theme.palette.background.primary,
    border: '2px',
    borderColor: primaryColor[0],
    borderRadius: '8px',
    color: theme.palette.text.primary,
    '& i': {
      fontSize: '24px',
    },
    '&:hover,&:focus': {
      background: theme.palette.background.hover,
    },
  },
});

export default styles;
