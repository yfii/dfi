import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchBalances, useFetchPoolBalances, useFetchContractApy } from '../../redux/hooks';
import useFilteredPools from '../../hooks/useFilteredPools';
import Pool from '../Pool';
import Filters from '../Filters';
import styles from './styles';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

export default function PoolList() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  let { pools, fetchPoolBalances } = useFetchPoolBalances();
  const [filter, setFilter] = useState('all');
  const { tokens, fetchBalances } = useFetchBalances();
  const filteredPools = useFilteredPools(pools, tokens, filter);
  const [openedCardList, setOpenCardList] = useState([0]);
  const classes = useStyles();

  const { contractApy, fetchContractApy } = useFetchContractApy();

  const openCard = id => {
    return setOpenCardList(openedCardList => {
      if (openedCardList.includes(id)) {
        return openedCardList.filter(item => item !== id);
      } else {
        return [...openedCardList, id];
      }
    });
  };

  useEffect(() => {
    if (address && web3) {
      fetchBalances({ address, web3, tokens });
      fetchPoolBalances({ address, web3, pools });
      const id = setInterval(() => {
        fetchBalances({ address, web3, tokens });
        fetchPoolBalances({ address, web3, pools });
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
    <>
      <Filters />
      <>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('hasBalance')}>Has Balance</button>
      </>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <h1 className={classes.mainTitle}>{t('Vault-MainTitle')}</h1>
          <Grid item container justify="space-between">
            <Grid item>
              <h3 className={classes.secondTitle}>{t('Vault-SecondTitle')}</h3>
            </Grid>
            <Grid item>
              <h3 className={classes.secondTitle}>{t('Vault-WithdrawFee')}</h3>
            </Grid>
          </Grid>
        </Grid>

        {filteredPools.map((pool, index) => (
          <Pool
            pool={pool}
            classes={classes}
            index={index}
            openedCardList={openedCardList}
            openCard={openCard}
            tokens={tokens}
            contractApy={contractApy}
            key={index}
          />
        ))}
      </Grid>
    </>
  );
}
