import React, { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Modal, styled, withStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Close } from '@material-ui/icons';
import { getSingleAssetSrc } from '../../features/helpers/getSingleAssetSrc';
import { allNetworks } from '../../network';

import styles from './styles';

const useStyles = makeStyles(styles);

const StyledDialog = withStyles(theme => ({
  paper: {
    margin: '16px',
    backgroundColor: theme.palette.background.primary,
  },
  paperScrollPaper: {
    maxHeight: 'calc(100% - 32px)',
  },
}))(Dialog);

const NetworksModal = memo(function NetworksModal({ isOpen, handleClose, currentNetwork }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleNetworkClick = useCallback(
    network => {
      if (network.id === currentNetwork.id) {
        handleClose();
      } else {
        window.location.hash = network.hash;
        window.location.reload();
      }
    },
    [currentNetwork, handleClose]
  );

  return (
    <StyledDialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="lg">
      <div className={classes.modalInner}>
        <IconButton className={classes.close} onClick={handleClose}>
          <Close />
        </IconButton>
        <h1 className={classes.title}>{t('Select-Network')}</h1>
        <div className={classes.networks}>
          <div className={classes.networksInner}>
            {allNetworks.map(network => (
              <div
                onClick={() => handleNetworkClick(network)}
                className={classes.network}
                key={network.id}
              >
                <img
                  className={classes.logo}
                  src={getSingleAssetSrc(network.asset)}
                  alt={`${currentNetwork.name}`}
                  width={75}
                  height={75}
                />
                <div className={classes.tag}>
                  {network.id === currentNetwork.id && <div className={classes.connected} />}
                  <p className={classes.networkName}>{network.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledDialog>
  );
});

export default NetworksModal;
