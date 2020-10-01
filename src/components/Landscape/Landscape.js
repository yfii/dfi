import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  landscape: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  plainSide: {
    position: 'absolute',
    bottom: '-50rem',
    right: '-40rem',
    width: '60rem',
    height: '60rem',
    borderRadius: '50%',
    backgroundColor: '#5A8F69',
    zIndex: 1,
  },
  plainBottom: {
    position: 'absolute',
    bottom: '-23rem',
    right: '-15vw',
    width: '70vw',
    height: '30rem',
    borderRadius: '50%',
    backgroundColor: '#78B388',
    zIndex: 1,
  },
  cow: {
    position: 'absolute',
    left: '75.56702075047443vw',
    bottom: '1.6rem',
    width: '6rem',
    transform: 'scaleX(-1)',
    zIndex: 2,
  },
}));

export default function Landscape() {
  const classes = useStyles();

  return (
    <div className={classes.landscape}>
      <div className={classes.plainSide}></div>
      <div className={classes.plainBottom}></div>
      <img className={classes.cow} src={require('../../images/BIFI-logo.svg')} />
    </div>
  );
}
