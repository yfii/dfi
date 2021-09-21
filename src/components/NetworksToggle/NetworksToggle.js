import React, { memo, useCallback, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getSingleAssetSrc } from '../../features/helpers/getSingleAssetSrc';
import NetworksModal from '../NetworksModal/NetworksModal';
import { allNetworks } from '../../network';
import styles from './styles';

const useStyles = makeStyles(styles);

const NetworksToggle = memo(function () {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const currentNetwork = useMemo(
    () => allNetworks.find(network => network.id === window.REACT_APP_NETWORK_ID),
    []
  );

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);
  const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);

  return (
    <>
      <div className={classes.container} onClick={handleOpen}>
        <img
          className={classes.logo}
          src={getSingleAssetSrc(currentNetwork.asset)}
          alt={`${currentNetwork.asset} logo`}
        />
        <div className={classes.tag}>
          <div className={classes.connected} />
          <p className={classes.networkName}>{currentNetwork.name}</p>
        </div>
      </div>
      <NetworksModal isOpen={isOpen} handleClose={handleClose} currentNetwork={currentNetwork} />
    </>
  );
});

export default NetworksToggle;
