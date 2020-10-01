import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { primaryColor, secondaryColor, successColor } from 'assets/jss/material-kit-pro-react';

const useStyles = makeStyles({
  mark: {
    height: '0',
    color: '#fff',
  },
  markLabel: {
    color: primaryColor[0],
    weight: 400,
    fontSize: '12px',
  },
  rail: {
    opacity: '1',
    color: secondaryColor[2],
  },
  thumb: {
    color: successColor[0],
  },
  track: {
    color: successColor[0],
  },
});

export default function CustomSlider(props) {
  const classes = useStyles();
  return (
    <Slider
      classes={{
        markLabel: classes.markLabel,
        rail: classes.rail,
        mark: classes.mark,
        thumb: classes.thumb,
        track: classes.track,
      }}
      defaultValue={0}
      valueLabelDisplay="auto"
      marks={[
        { value: 0, label: '0%' },
        { value: 25, label: '25%' },
        { value: 50, label: '50%' },
        { value: 75, label: '75%' },
        { value: 100, label: '100%' },
      ]}
      {...props}
    />
  );
}
