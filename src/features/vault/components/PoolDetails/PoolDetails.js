import React from 'react';
import AccordionDetails from '@material-ui/core/AccordionActions';
import Grid from '@material-ui/core/Grid';

import DepositSection from './DepositSection/DepositSection';
import WithdrawSection from './WithdrawSection/WithdrawSection';
import HarvestSection from './HarvestSection/HarvestSection';
import { shouldHideFromHarvest } from 'features/helpers/utils';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from 'components/CustomButtons/Button.js';
import { useConnectWallet } from 'features/home/redux/hooks';
import { createWeb3Modal } from 'features/web3';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(styles);

const PoolDetails = ({ pool, balanceSingle, index, sharesBalance }) => {
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
        <Grid container>
          <DepositSection index={index} pool={pool} balanceSingle={balanceSingle} />
          <WithdrawSection index={index} pool={pool} sharesBalance={sharesBalance} />
          {shouldHideFromHarvest(pool.id) ? '' : <HarvestSection index={index} pool={pool} />}
        </Grid>
      </AccordionDetails>
    );
  } else {
    return <div className={classes.noWalletButtonCon}>
      <Button className={classes.noWalletButton} onClick={handleConnectWallet}>{t('Vault-ConnectWallet')}</Button>
    </div>
  }
};

export default PoolDetails;
