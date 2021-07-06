import React, { useState, useCallback, memo } from 'react';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BigNumber from 'bignumber.js';

import { byDecimals } from 'features/helpers/bignumber';
import PoolSummary from '../PoolSummary/PoolSummary';
import styles from './styles';
import { useSelector } from 'react-redux';
import PoolActions from '../PoolActions/PoolActions';
import AccordionDetails from '@material-ui/core/AccordionActions';

const useStyles = makeStyles(styles);

const Pool = ({
  pool,
  index,
  tokens,
  apy,
  fetchBalancesDone,
  fetchApysDone,
  fetchVaultsDataDone,
}) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const toggleCard = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const timestamp = Math.floor(Date.now() / 1000);
  const stake = useSelector(state => state.stake.pools);
  const launchpool = stake.find(p => {
    return p.token === pool.earnedToken && p.periodFinish >= timestamp;
  });

  let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  let sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);

  return (
    <Grid item xs={12} container key={index} className={classes.container} spacing={0}>
      <Accordion
        expanded={isOpen}
        className={classes.accordion}
        square={true}
        TransitionProps={{ unmountOnExit: true }}
      >
        <PoolSummary
          pool={pool}
          launchpool={launchpool}
          balanceSingle={balanceSingle}
          toggleCard={toggleCard}
          sharesBalance={sharesBalance}
          apy={apy}
          fetchBalancesDone={fetchBalancesDone}
          fetchApysDone={fetchApysDone}
          fetchVaultsDataDone={fetchVaultsDataDone}
        />
        <Divider variant="middle" className={classes.divider} />
        <AccordionDetails style={{ justifyContent: 'space-between' }}>
          <PoolActions pool={pool} balanceSingle={balanceSingle} sharesBalance={sharesBalance} />
        </AccordionDetails>
      </Accordion>
    </Grid>
  );
};

export default memo(Pool);
