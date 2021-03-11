import { successColor } from 'assets/jss/material-kit-pro-react.js';

const styles = theme => ({
  container: {
    display: 'inline-flex',
    borderRadius: '35px',
    backgroundColor: theme.palette.background.secondary,
    '&:hover': {
      backgroundColor: theme.palette.background.border,
      cursor: 'pointer',
    },
    padding: '0 16px 0 0',
    alignItems: 'center',
  },
  logo: {
    height: '40px',
  },
  connected: {
    width: '10px',
    height: '10px',
    backgroundColor: successColor[1],
    borderRadius: '50%',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '16px',
  },
  networkName: {
    margin: '0 0 0 8px',
    fontWeight: 'bold',
  },
});

export default styles;
