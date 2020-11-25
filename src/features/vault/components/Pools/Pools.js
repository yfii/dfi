import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchBalances, useFetchPoolBalances, useFetchContractApy } from '../../redux/hooks';
import VisiblePools from '../VisiblePools/VisiblePools';
import styles from './styles';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

export default function Pools() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  let { pools, fetchPoolBalances } = useFetchPoolBalances();
  const { tokens, fetchBalances } = useFetchBalances();
  const { contractApy, fetchContractApy } = useFetchContractApy();
  const classes = useStyles();

  useEffect(() => {
    if (address && web3) {
      fetchBalances({ address, web3, tokens });
      fetchPoolBalances({ address, web3, pools });
      fetchContractApy();
      const id = setInterval(() => {
        fetchBalances({ address, web3, tokens });
        fetchPoolBalances({ address, web3, pools });
        fetchContractApy();
      }, FETCH_INTERVAL_MS);
      return () => clearInterval(id);
    }

    // Adding tokens and pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchBalances, fetchPoolBalances]);

  useEffect(() => {
    fetchContractApy();
  }, [pools, fetchContractApy]);

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12}>
        <h1 className={classes.title}>{t('Vault-MainTitle')}</h1>
        <div className={classes.subtitles}>
          <h3 className={classes.subtitle}>{t('Vault-SecondTitle')}</h3>
          <h3 className={classes.subtitle}>{t('Vault-WithdrawFee')}</h3>
        </div>
      </Grid>

      <VisiblePools pools={pools} apys={contractApy} tokens={tokens} />
    </Grid>
  );
}
