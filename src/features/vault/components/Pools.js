import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { byDecimals } from 'features/helpers/bignumber';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { useConnectWallet } from '../../home/redux/hooks';
import { useFetchBalances, useFetchPoolBalances, useFetchContractApy } from '../redux/hooks';
import PoolSummary from './PoolSummary';
import PoolDetails from './PoolDetails';
import sectionPoolsStyle from '../styles/poolsStyle';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(sectionPoolsStyle);

export default function Pools() {
  const { t } = useTranslation();
  const { web3, address } = useConnectWallet();
  let { pools, fetchPoolBalances } = useFetchPoolBalances();
  const { tokens, fetchBalances } = useFetchBalances();
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
    <Grid container style={{ paddingTop: '4px' }}>
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

      {pools.map((pool, index) => {
        let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
        let singleDepositedBalance = byDecimals(tokens[pool.earnedToken].tokenBalance, pool.tokenDecimals);
        let depositedApy = contractApy[pool.id] || 0;
        return (
          <Grid
            item
            xs={12}
            container
            key={index}
            style={{ marginBottom: '24px', border: '1px solid #DED9D5' }}
            spacing={0}
          >
            <div style={{ width: '100%' }}>
              <Accordion
                expanded={Boolean(openedCardList.includes(index))}
                className={classes.accordion}
                TransitionProps={{ unmountOnExit: true }}
              >
                <PoolSummary
                  pool={pool}
                  index={index}
                  classes={classes}
                  onClick={openCard}
                  balanceSingle={balanceSingle}
                  openedCardList={openedCardList}
                  singleDepositedBalance={singleDepositedBalance}
                  depositedApy={depositedApy}
                />
                <PoolDetails
                  classes={classes}
                  pool={pool}
                  balanceSingle={balanceSingle}
                  singleDepositedBalance={singleDepositedBalance}
                />
                <Divider variant="middle" className={classes.accordionDivider} />
              </Accordion>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}
