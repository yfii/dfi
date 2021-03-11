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
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className={classes.networks}>
        <a href="https://app.beefy.finance" className={classes.networkContainer}>
          <img className={classes.logo} src={require('../../images/single-assets/BNB.png')} />
          <p className={classes.networkName}>BSC Mainnet</p>
        </a>
        <a href="https://heco.beefy.finance" className={classes.networkContainer}>
          <img className={classes.logo} src={require('../../images/single-assets/HT.png')} />
          <p className={classes.networkName}>HECO</p>
        </a>
      </div>
    </Modal>
  );
};

export default NetworksModal;
