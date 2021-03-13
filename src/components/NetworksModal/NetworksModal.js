import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';

import styles from './styles';
import { useNetworks } from 'components/NetworksProvider/NetworksProvider';

const useStyles = makeStyles(styles);

const NetworksModal = () => {
  const classes = useStyles();
  const { isModalOpen, closeModal, networks, currentNetwork } = useNetworks();

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
          backgroundColor: 'rgb(251, 249, 246)',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <IconButton className={classes.close} onClick={closeModal}>
        <Close />
      </IconButton>
      <h1 className={classes.title}>Select Network</h1>
      <div className={classes.networks}>
        {networks.map(network => (
          <div onClick={() => handleNetworkClick(network)} className={classes.networkContainer}>
            <img
              className={classes.logo}
              src={require(`images/single-assets/${network.asset}.png`)}
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
