import { primaryColor } from 'assets/jss/material-kit-pro-react';

const styles = theme => ({
  roundedBtn: {
    margin: '0 10px',
    padding: '5px 30px',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    borderRadius: '20px',
    backgroundColor: primaryColor[0],
    '& .MuiButton-label': {
      color: 'white',
    },
  },
  countdown: {
    color: theme.palette.text.primary,
    fontSize: '18px',
    fontWeight: 'bold',
    padding: 0,
    textAlign: 'right',
    margin: '0 10px',
  },

  mb: {
    marginBottom: '24px',
  },

  row: {
    position: 'relative',
    textAlign: 'center',
    padding: '20px',
    marginBottom: '24px',
    border: '1px solid ' + theme.palette.background.border,
    borderRadius: '8px',
    backgroundColor: theme.palette.background.primary,
    '& .MuiAvatar-root': {
      width: theme.spacing(7),
      height: theme.spacing(7),
      margin: '0 auto',
    },
  },

  retired: {
    background: theme.palette.type === 'dark' ? '#614141' : '#d2c5c9',
  },

  title: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      fontSize: '18px',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '22px',
    },
    '& .MuiSvgIcon-root': {
      color: 'red',
    },
  },

  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    color: theme.palette.text.secondary,
  },

  fire: {
    width: '32px !important',
    height: '32px !important',
    margin: '0 !important',
  },

  actionBtn: {
    margin: '12px 5px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '5px',
    minWidth: '185px',
    backgroundColor: primaryColor[0],
    '& .MuiButton-label': {
      color: 'white',
      textTransform: 'capitalize',
    },
  },
  btnBoost: {
    padding: '7px 30px',
  },
  boosted: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '3px 8px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '13px',
    borderTopLeftRadius: '8px',
    background: theme.palette.type === 'dark' ? '#5a8f69' : '#85b18b',
  },

  partnerHeader: {
    textAlign: 'center',
    paddingBottom: '20px',
    '& img': {
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: 'auto',
      },
    },
  },

  partnerBody: {
    textAlign: 'left',
    color: theme.palette.text.primary,
    background: theme.palette.type === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.5)',
    padding: '15px',
  },

  ribbon: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    zIndex: 1,
    overflow: 'hidden',
    width: '90px',
    height: '90px',
    textAlign: 'right',
    '& span': {
      fontWeight: 'bold',
      color: '#FFF',
      textTransform: 'uppercase',
      textAlign: 'center',
      lineHeight: '20px',
      transform: 'rotate(-45deg)',
      width: '110px',
      display: 'block',
      position: 'absolute',
      bottom: '22px',
      right: '-23px',
    },
    '& .soon': {
      fontSize: '11px',
      background: theme.palette.type === 'dark' ? '#1e67b4' : '#56a0ee',
    },
    '& .closed': {
      fontSize: '12px',
      background: theme.palette.type === 'dark' ? '#5a8f69' : '#57ad82',
    },
  },

  modal: {
    padding: '40px',
    border: '1px solid ' + theme.palette.background.border,
    borderRadius: '4px',
    backgroundColor: theme.palette.background.primary,
  },

  h1: {
    textAlign: 'center',
    fontSize: '26px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },

  balance: {
    textAlign: 'right',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.text.secondary,
      textDecoration: 'underline',
    },
  },

  input: {
    width: '100%',
  },

  modalbtns: {
    textAlign: 'center',
    marginTop: '24px',
  },

  boost: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiAvatar-root': {
      marginRight: '10px',
      height: '30px',
      width: '30px',
    },
    '& .MuiBox-root': {
      lineHeight: 0,
    },
  },
  boostImg: {
    height: '20px',
    filter:
      'invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(1000%) contrast(1000%)',
  },

  divider: {
    margin: '10px 0',
  },
});

export { styles };
