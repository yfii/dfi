import React, { useEffect, useState, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Cow from '../Cow/Cow';
import styles from './style';

const useStyles = makeStyles(styles);

const Pastures = () => {
  const classes = useStyles();
  const [cows, setCows] = useState([]);

  useEffect(() => {
    let n = Math.ceil(Math.random() * 3) + 3;
    setCows(new Array(n).fill(0));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.pastureLeft} />
      <div className={classes.pastureRight} />
      <div className={classes.pastureCenterBg} />
      <div className={classes.pastureCenterFg} />
      {cows &&
        cows.map((_, index) => <Cow key={`cow${index}`} total={cows.length} index={index} />)}
    </div>
  );
};

export default memo(Pastures);
