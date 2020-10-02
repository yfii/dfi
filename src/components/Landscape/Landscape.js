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
    backgroundColor: '#5A8F69',
    borderRadius: '50%',
    zIndex: 1,
    bottom: '-50rem',
    right: '-40rem',
    width: '59rem',
    height: '59rem',
    [theme.breakpoints.up('lg')]: {
      bottom: '-46rem',
      right: '-40rem',
      width: '59rem',
      height: '59rem',
    },
  },
  plainBottom: {
    position: 'absolute',
    backgroundColor: '#78B388',
    borderRadius: '50%',
    zIndex: 1,
    bottom: '-23rem',
    right: '-15vw',
    width: '50vw',
    height: '26rem',
    [theme.breakpoints.up('lg')]: {
      bottom: '-20rem',
      right: '-15vw',
      width: '50vw',
      height: '26rem',
    },
  },
  cow: {
    position: 'absolute',
    transform: 'scaleX(-1)',
    zIndex: 2,
    right: '10vw',
    bottom: '1.6rem',
    width: '4.5rem',
    [theme.breakpoints.up('lg')]: {
      right: '10vw',
      bottom: '1.6rem',
      width: '5rem',
    },
  },
}));

export default function Landscape() {
  const classes = useStyles();

  return (
    <div className={classes.landscape}>
      <div className={classes.plainSide}></div>
      <div className={classes.plainBottom}></div>
      <a href="https://youtu.be/dQw4w9WgXcQ?t=43" target="_blank">
        <img className={classes.cow} src={require('../../images/BIFI-logo.svg')} />
      </a>
    </div>
  );
}
