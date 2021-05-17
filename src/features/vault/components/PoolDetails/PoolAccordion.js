import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AccordionDetails from '@material-ui/core/AccordionActions';

import PoolActions from '../PoolActions/PoolActions';
import styles from './styles';
import Button from 'components/CustomButtons/Button.js';
import { useConnectWallet } from 'features/home/redux/hooks';
import { createWeb3Modal } from 'features/web3';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);

const PoolAccordion = ({ pool, balanceSingle, index, sharesBalance }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { connected, connectWallet } = useConnectWallet();

  const handleConnectWallet = () => {
    const web3Modal = createWeb3Modal(t);
    connectWallet(web3Modal);
  };

  if (connected) {
    return (
      <AccordionDetails style={{ justifyContent: 'space-between' }}>
        <PoolActions pool={pool} balanceSingle={balanceSingle} sharesBalance={sharesBalance} />
      </AccordionDetails>
    );
  } else {
    return (
      <div className={classes.noWalletButtonCon}>
        <Button className={classes.noWalletButton} onClick={handleConnectWallet}>
          {t('Vault-ConnectWallet')}
        </Button>
      </div>
    );
  }
};

export default PoolAccordion;
