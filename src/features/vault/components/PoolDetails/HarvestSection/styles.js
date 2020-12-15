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
    color: primaryColor[1],
    fontWeight: '500',
  },
  showDetailBottom: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& + &': {
      marginLeft: '5px',
    },
  },
  showResponsiveButtonCon: {
    width: '160px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '75px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '80px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '100px',
    }
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
    border: `1px solid ${primaryColor[0]}`,
    color: primaryColor[0],
    '&:hover': {
      '& .MuiButton-label': {
        color: 'white',
      },
    },
  },
  showDetailButtonContained: {
    backgroundColor: primaryColor[0],
    '& .MuiButton-label': {
      color: 'white',
    },
  },
});

export default styles;
