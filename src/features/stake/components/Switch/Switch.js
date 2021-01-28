import React from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';
import background from './background.png';
import foreground from './foreground.png';

const useStyles = makeStyles(styles);

const Switch = ({ className, value, onChange, options }) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.container, className)}>
      <img src={background} alt="" />
      <img src={foreground} alt="" style={{ [value === options[0] ? 'left' : 'right']: 0 }}/>
      <div className={classes.labels}>
        {options.map(option => (
          <span
            key={option}
            className={classNames({ [classes.selected]: value === option })}
            onClick={() => { onChange(option); }}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Switch;
