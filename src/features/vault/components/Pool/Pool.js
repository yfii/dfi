import React, { useState, useCallback } from 'react';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { byDecimals } from 'features/helpers/bignumber';
import PoolSummary from '../PoolSummary/PoolSummary';
import PoolDetails from '../PoolDetails/PoolDetails';
import styles from './styles';

const useStyles = makeStyles(styles);

const Pool = ({ pool, index, tokens, contractApy }) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(index === 0 ? true : false);
  const toggleCard = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  let singleDepositedBalance = byDecimals(
    tokens[pool.earnedToken].tokenBalance,
    pool.tokenDecimals
  );
  let depositedApy = contractApy[pool.id] || 0;
  console.log('Rendered');
  return (
    <Grid item xs={12} container key={index} className={classes.container} spacing={0}>
      <Accordion
        expanded={isOpen}
        className={classes.accordion}
        TransitionProps={{ unmountOnExit: true }}
      >
        <PoolSummary
          pool={pool}
          balanceSingle={balanceSingle}
          toggleCard={toggleCard}
          isOpen={isOpen}
          singleDepositedBalance={singleDepositedBalance}
          depositedApy={depositedApy}
        />
        <Divider variant="middle" className={classes.divider} />
        <PoolDetails
          pool={pool}
          balanceSingle={balanceSingle}
          singleDepositedBalance={singleDepositedBalance}
        />
      </Accordion>
    </Grid>
  );
};

export default Pool;
