import React, { useState, useCallback, memo } from 'react';
import Accordion from '@material-ui/core/Accordion';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BigNumber from 'bignumber.js';

import { byDecimals } from 'features/helpers/bignumber';
import PoolSummary from '../PoolSummary/PoolSummary';
import PoolDetails from '../PoolDetails/PoolDetails';
import styles from './styles';

const useStyles = makeStyles(styles);

const Pool = ({ pool, index, tokens, apy }) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(index === 0 ? true : false);
  const toggleCard = useCallback(() => setIsOpen(!isOpen), [isOpen]);

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
          balanceSingle={balanceSingle}
          toggleCard={toggleCard}
          isOpen={isOpen}
          sharesBalance={sharesBalance}
          apy={apy}
        />
        <Divider variant="middle" className={classes.divider} />
        <PoolDetails
          pool={pool}
          balanceSingle={balanceSingle}
          sharesBalance={sharesBalance}
          index={index}
        />
      </Accordion>
    </Grid>
  );
};

export default memo(Pool);
