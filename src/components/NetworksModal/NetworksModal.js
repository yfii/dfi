import React from 'react';
import Modal from 'react-modal';
import { makeStyles } from '@material-ui/core/styles';

import styles from './styles';
import { useNetworks } from 'components/NetworksProvider/NetworksProvider';

const useStyles = makeStyles(styles);

const NetworksModal = () => {
  const classes = useStyles();
  const { isModalOpen, closeModal } = useNetworks();

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          backgroundColor: 'rgb(251, 249, 246)',
          width: '50%',
          height: '50vh',
        },
      }}
    >
      <div container className={classes.networks}>
        <div className={classes.networkProfile}>
          <img
            className={classes.networkImgLarge}
            src={require('../../images/single-assets/BNB.png')}
          />
          <p className={classes.networkName}>BSC Mainnet</p>
        </div>
        <div className={classes.networkProfile}>
          <img
            className={classes.networkImgLarge}
            src={require('../../images/single-assets/HT.png')}
          />
          <p className={classes.networkName}>HECO</p>
        </div>
      </div>
    </Modal>
  );
};

export default NetworksModal;
