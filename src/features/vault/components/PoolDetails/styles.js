import { primaryColor } from 'assets/jss/material-kit-pro-react.js';

const styles = theme => ({
  noWalletButtonCon: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  noWalletButton: {
    margin: '20px 0',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '5px',
    backgroundColor: primaryColor[0],
    '& .MuiButton-label': {
      color: 'white',
    },
  },
  container: {
    position: 'relative',
    backgroundColor: theme.palette.background.extra,
    padding: '24px',
    border: '1px solid ' + theme.palette.background.border,
  },
  heading: {
    color: theme.palette.primary.main,
  },
  summary: {
    paddingTop: '24px',
    paddingBottom: '24px',
  },
  statusIcon: {
    marginRight: '.5rem',
  },
  status: {
    padding: '24px',
    marginBottom: '8px',
    background: pool =>
      pool.status === 'eol'
        ? theme.palette.background.retired
        : pool.depositsPaused
        ? theme.palette.background.paused
        : theme.palette.background.primary,
  },
  description: {
    padding: '8px',
  },
  item: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    [theme.breakpoints.up('sm')]: {
      flexBasis: '50%',
      maxWidth: '50%',
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '30%',
      maxWidth: '30%',
    },
  },
  itemBalances: {
    [theme.breakpoints.up('sm')]: {
      flexBasis: '25%',
      maxWidth: '25%',
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: '14%',
      maxWidth: '14%',
    },
  },
  itemStats: {
    [theme.breakpoints.up('lg')]: {
      flexBasis: '14%',
      maxWidth: '14%',
    },
  },
  itemInner: {
    textAlign: 'center',
  },
});

export default styles;
