import { secondaryColor } from 'assets/jss/material-kit-pro-react';

const styles = theme => ({
  close: {
    position: 'absolute',
    right: '8px',
    top: '8px',
  },
  title: {
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  networks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    height: '100%',
  },
  networkContainer: {
    margin: '24px',
    textAlign: 'center',
    padding: '24px',
    transition: 'all 300ms ease 0s',
    '&:hover': {
      cursor: 'pointer',
      transform: `scale(1.1)`,
    },
  },
  logo: {
    height: '100px',
  },
  networkName: {
    color: '#000',
    fontSize: '18px',
    minWidth: '150px',
    fontWeight: 'bold',
    lineHeight: '18px',
    marginBottom: '0',
  },
});

export default styles;
