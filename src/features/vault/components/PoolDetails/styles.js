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
});

export default styles;
