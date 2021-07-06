import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import { useNetworks } from 'components/NetworksProvider/NetworksProvider';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core';
import { getSingleAssetSrc } from '../../features/helpers/getSingleAssetSrc';

import styles from './styles';

const useStyles = makeStyles(styles);

const NetworksModal = () => {
  const classes = useStyles();
  const { isModalOpen, closeModal, networks, currentNetwork } = useNetworks();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleNetworkClick = network => {
    if (network.id === currentNetwork.id) {
      closeModal();
    } else {
      window.open(network.url, '_self');
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          backgroundColor: theme.palette.background.primary,
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderColor: theme.palette.background.border,
        },
        overlay: {
          backgroundColor: theme.palette.background.overlay,
        },
      }}
    >
      <IconButton className={classes.close} onClick={closeModal}>
        <Close />
      </IconButton>
      <h1 className={classes.title}>{t('Select-Network')}</h1>
      <div className={classes.networks}>
        {networks.map(network => (
          <div
            onClick={() => handleNetworkClick(network)}
            className={classes.networkContainer}
            key={network.id}
          >
            <img
              className={classes.logo}
              src={getSingleAssetSrc(network.asset)}
              alt={`${currentNetwork.asset} logo`}
            />
            <div className={classes.tag}>
              {network.id === currentNetwork.id && <div className={classes.connected}></div>}
              <p className={classes.networkName}>{network.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default NetworksModal;
