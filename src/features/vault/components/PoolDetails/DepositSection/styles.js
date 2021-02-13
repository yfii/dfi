import { primaryColor } from 'assets/jss/material-kit-pro-react.js';

const styles = theme => ({
  sliderDetailContainer: {
    padding: '24px 30px',
  },
  showDetailLeft: {
    float: 'left',
    marginBottom: '10px',
    fontSize: '1rem',
    lineHeight: '20px',
    color: theme.palette.text.secondary,
    fontWeight: '500',
  },
  showDetailButtonCon: {
    display: 'flex',
    justifyContent: 'space-around',
    '& + &': {
      marginLeft: '5px',
    },
  },
  showPausedMsg: {
    display: 'flex',
    margin: '12px 5px',
    padding: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '5px',
    background: `${theme.palette.background.paused}`,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  showRetiredMsg: {
    display: 'flex',
    margin: '12px 5px',
    padding: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '5px',
    background: `${theme.palette.background.retired}`,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  showDetailButton: {
    margin: '12px 5px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '5px',
    width: '160px',
  },
  showDetailButtonOutlined: {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.primary.main}`,
    color: primaryColor[0],
    '&:hover': {
      '& .MuiButton-label': {
        color: 'white',
      },
    },
    '& .MuiTouchRipple-root span': {
      backgroundColor: primaryColor[0],
    },
  },
  showDetailButtonContained: {
    backgroundColor: primaryColor[0],
    '& .MuiButton-label': {
      color: 'white',
    },
  },
  numericInput: {
    color: primaryColor[0],
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0',
    lineHeight: '8px',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '16px',
    },
    fontWeight: '550',
    color: theme.palette.text.secondary,
  },
});

export default styles;
