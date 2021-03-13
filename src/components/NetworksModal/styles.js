import { successColor } from 'assets/jss/material-kit-pro-react';

const styles = theme => ({
  close: {
    position: 'absolute',
    right: '8px',
    top: '8px',
  },
  title: {
    fontSize: '24px',
    letterSpacing: '0',
    lineHeight: '24px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      fontSize: '32px',
      lineHeight: '32px',
    },
  },
  networks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '100%',
  },
  networkContainer: {
    margin: '16px',
    textAlign: 'center',
    transition: 'all 300ms ease 0s',
    '&:hover': {
      cursor: 'pointer',
      transform: `scale(1.1)`,
    },
    [theme.breakpoints.up('md')]: {
      margin: '32px',
    },
  },
  logo: {
    height: '75px',
    [theme.breakpoints.up('md')]: {
      height: '100px',
    },
  },
  connected: {
    width: '10px',
    height: '10px',
    backgroundColor: successColor[1],
    borderRadius: '50%',
    margin: 'auto 8px auto -10px',
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8px',
  },
  networkName: {
    margin: '0',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
});

export default styles;
