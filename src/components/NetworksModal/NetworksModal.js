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
  const { isModalOpen, closeModal } = useNetworks();

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

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
        <a href="https://app.beefy.finance" className={classes.networkContainer}>
          <img className={classes.logo} src={require('../../images/single-assets/BNB.png')} />
          <div className={classes.tag}>
            <div className={classes.connected}></div>
            <p className={classes.networkName}>BSC</p>
          </div>
        </a>
        <a href="https://heco.beefy.finance" className={classes.networkContainer}>
          <img className={classes.logo} src={require('../../images/single-assets/HT.png')} />
          <div className={classes.tag}>
            <p className={classes.networkName}>HECO</p>
          </div>
        </a>
      </div>
    </Modal>
  );
};

export default NetworksModal;
