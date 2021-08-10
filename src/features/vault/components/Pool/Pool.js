import React, { memo, useCallback, useEffect, useState } from 'react';
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
import { useLaunchpoolSubscriptions } from '../../../stake/redux/hooks';
import { launchpools } from '../../../helpers/getNetworkData';

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
  const { subscribe } = useLaunchpoolSubscriptions();
  const balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
  const sharesBalance = new BigNumber(tokens[pool.earnedToken].tokenBalance);
  const launchpoolId = useSelector(state => state.vault.vaultLaunchpool[pool.id]);
  const launchpool = launchpoolId ? launchpools[launchpoolId] : null;
  const activeLaunchpools = useSelector(state => state.vault.vaultLaunchpools[pool.id]);
  const multipleLaunchpools = activeLaunchpools.length > 1;

  useEffect(() => {
    const unsubscribes = activeLaunchpools.map(launchpoolId =>
      subscribe(launchpoolId, {
        poolApr: true,
        poolFinish: true,
      })
    );

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [subscribe, activeLaunchpools]);

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
          multipleLaunchpools={multipleLaunchpools}
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
