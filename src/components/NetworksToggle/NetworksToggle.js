import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { useNetworks } from '../NetworksProvider/NetworksProvider';
import styles from './styles';

const useStyles = makeStyles(styles);

const NetworksToggle = () => {
  const classes = useStyles();
  const { openModal, currentNetwork } = useNetworks();

  return (
    <div className={classes.container} onClick={openModal}>
      <img
        className={classes.logo}
        src={require(`images/single-assets/${currentNetwork.asset}.png`)}
        alt={`${currentNetwork.asset} logo`}
      />
      <div className={classes.tag}>
        <div className={classes.connected}></div>
        <p className={classes.networkName}>{currentNetwork.name}</p>
      </div>
    </div>
  );
};

export default NetworksToggle;
