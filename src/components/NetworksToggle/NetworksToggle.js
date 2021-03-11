import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useNetworks } from '../NetworksProvider/NetworksProvider';
import styles from './styles';

const useStyles = makeStyles(styles);

const NetworksToggle = () => {
  const classes = useStyles();
  const { openModal } = useNetworks();

  return (
    <div className={classes.networkToggle} onClick={openModal}>
      <img className={classes.networkImg} src={require('images/single-assets/BNB.png')} />
      <div className={classes.networkTag}>
        <div className={classes.status}></div>
        <p className={classes.networkText}>BSC Mainnet</p>
      </div>
    </div>
  );
};

export default NetworksToggle;
