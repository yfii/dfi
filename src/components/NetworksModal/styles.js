import { successColor } from 'assets/jss/material-kit-pro-react';

const styles = theme => ({
  close: {
    position: 'absolute',
    right: '8px',
    top: '8px',
  },
  modalInner: {
    '@media (min-width:464px)': {
      padding: '16px',
    },
  },
  title: {
    padding: '16px',
    fontSize: '24px',
    margin: '0',
    letterSpacing: '0',
    lineHeight: '1',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width:464px)': {},
    [theme.breakpoints.up('md')]: {
      fontSize: '32px',
    },
  },
  networks: {
    overflow: 'hidden',
    padding: '16px 0',
  },
  networksInner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: '-32px',
    [theme.breakpoints.up('md')]: {
      marginTop: '-32px',
    },
  },
  network: {
    padding: '32px 16px 0 16px',
    flexBasis: '130px',
    flexGrow: '0',
    flexShrink: '0',
    textAlign: 'center',
    transition: 'all 300ms ease 0s',
    '&:hover': {
      cursor: 'pointer',
      transform: `scale(1.1)`,
    },
    [theme.breakpoints.up('md')]: {
      padding: '32px 32px 0 32px',
      flexBasis: '164px',
    },
    [theme.breakpoints.up('lg')]: {
      flexGrow: '1',
    },
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    width: '75px',
    [theme.breakpoints.up('md')]: {
      width: '100px',
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
