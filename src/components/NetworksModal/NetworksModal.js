import React, { memo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Grid, IconButton, withStyles } from '@material-ui/core';
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
    <StyledDialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <div className={classes.modalInner}>
        <IconButton className={classes.close} onClick={handleClose}>
          <Close />
        </IconButton>
        <h1 className={classes.title}>{t('Select-Network')}</h1>
        <div className={classes.networks}>
          <div className={classes.networksInner}>
            <Grid container>
              {allNetworks.map(network => (
                <Grid key={network.name} item xs={4}>
                  <div
                    onClick={() => handleNetworkClick(network)}
                    className={classes.network}
                    key={network.id}
                  >
                    <img
                      className={classes.logo}
                      src={getSingleAssetSrc(network.asset)}
                      alt={`${currentNetwork.name}`}
                    />
                    <div className={classes.tag}>
                      {network.id === currentNetwork.id && <div className={classes.connected} />}
                      <p className={classes.networkName}>{network.name}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </StyledDialog>
  );
});

export default NetworksModal;
