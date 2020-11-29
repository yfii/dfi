import React from 'react';
import AccordionDetails from '@material-ui/core/AccordionActions';
import Grid from '@material-ui/core/Grid';

import DepositSection from './DepositSection/DepositSection';
import WithdrawSection from './WithdrawSection/WithdrawSection';

const PoolDetails = ({ pool, balanceSingle, index, singleDepositedBalance }) => {
  return (
    <AccordionDetails style={{ justifyContent: 'space-between' }}>
      <Grid container>
        <DepositSection index={index} pool={pool} balanceSingle={balanceSingle} />
        <WithdrawSection
          index={index}
          pool={pool}
          singleDepositedBalance={singleDepositedBalance}
        />
      </Grid>
    </AccordionDetails>
  );
};

export default PoolDetails;
