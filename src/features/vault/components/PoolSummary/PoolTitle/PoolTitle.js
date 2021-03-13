import React, { memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';

const useStyles = makeStyles(styles);

const PoolTitle = ({ name, logo, description, launchpool }) => {
  const classes = useStyles();

  return (
    <Grid item xs={3} className={classes.container}>
      <Avatar
        alt={name}
        variant="square"
        imgProps={{ style: { objectFit: 'contain' } }}
        src={require(`images/${logo}`)}
      />
      <div className={classes.texts}>
        <Typography className={classes.title} variant="body2" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.subtitle} variant="body2">
          {description}
        </Typography>
        {launchpool ? (
          <a className={classes.btnBoost} href={'/stake/pool/' + launchpool.poolIndex}>
            <img alt="Boost" src={require('../../../../../images/stake/boost.svg')} height={15} />
            <span>
              <img alt="Fire" src={require('../../../../../images/stake/fire.png')} height={30} />
            </span>
          </a>
        ) : (
          ''
        )}
      </div>
    </Grid>
  );
};

export default memo(PoolTitle);
