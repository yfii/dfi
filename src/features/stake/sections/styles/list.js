import { primaryColor } from 'assets/jss/material-kit-pro-react';

const styles = theme => ({
  launchpool: {
    textAlign: 'center',
    paddingBottom: '30px',
    '& img': {
      height: '60px',
    },
  },
  item: {
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
      margin: '10px auto',
    },
  },
  itemRetired: {
    background: theme.palette.type === 'dark' ? '#614141' : '#d0c5c9',
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
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    paddingTop: '10px',
    color: theme.palette.text.primary,
    lineHeight: '18px',
    letterSpacing: 0,
    wordBreak: 'break-word',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    lineHeight: '14px',
    letterSpacing: 0,
  },
  countdown: {
    color: theme.palette.text.primary,
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '5px 0',
    height: '37px',
  },
  stakeBtn: {
    margin: '8px 0',
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
  ribbon: {
    position: 'absolute',
    right: '0',
    bottom: '0',
    zIndex: 1,
    overflow: 'hidden',
    width: '85px',
    height: '85px',
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
  faq: {
    marginTop: '30px',
    '& .MuiPaper-root': {
      background: 'none',
    },
    '& .MuiAccordion-root': {
      border: '1px solid ' + theme.palette.background.border,
      borderRadius: '4px',
      marginBottom: '4px',
    },
    '& .MuiAccordion-root .MuiAccordionSummary-root': {
      background: theme.palette.background.secondary,
    },
    '& .MuiAccordionSummary-root .MuiTypography-root': {
      fontWeight: 'bold',
    },
    '& .MuiAccordion-root.Mui-expanded': {
      margin: '0 0 4px 0',
    },
    '& .MuiAccordionDetails-root': {
      borderTop: '1px solid ' + theme.palette.background.border,
      padding: '25px 15px',
    },
  },
});

export default styles;
