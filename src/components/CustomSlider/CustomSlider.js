import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import { secondaryColor, successColor } from 'assets/jss/material-kit-pro-react';

const useStyles = makeStyles((theme) => ({
  mark: {
    height: '0',
  },
  markLabel: {
    color: theme.palette.text.primary,
    weight: 400,
    fontSize: '12px',
  },
  valueLabel: {
    '& > span': {
      color: successColor[0],
    },
  },
  rail: {
    color: secondaryColor[2],
    height: 2,
    opacity: 1,
  },
  thumb: {
    color: successColor[0],
  },
  track: {
    color: successColor[0],
    height: 2,
  },
  active: {
    color: successColor[1],
  },
}));

export default function CustomSlider(props) {
  const classes = useStyles();
  return (
    <Slider
      classes={{
        mark: classes.mark,
        markLabel: classes.markLabel,
        valueLabel: classes.valueLabel,
        rail: classes.rail,
        thumb: classes.thumb,
        track: classes.track,
        active: classes.active,
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
