import React from 'react';
import Grid from '@material-ui/core/Grid';

import DepositSection from '../PoolDetails/DepositSection/DepositSection';
import WithdrawSection from '../PoolDetails/WithdrawSection/WithdrawSection';
import HarvestSection from '../PoolDetails/HarvestSection/HarvestSection';
import { shouldHideFromHarvest } from '../../../helpers/utils';

const PoolActions = ({ pool, balanceSingle, index, sharesBalance }) => {
  return (
    <Grid container>
      <DepositSection index={index} pool={pool} balanceSingle={balanceSingle} />
      <WithdrawSection index={index} pool={pool} sharesBalance={sharesBalance} />
      {shouldHideFromHarvest(pool.id) ? '' : <HarvestSection index={index} pool={pool} />}
    </Grid>
  );
};

export default PoolActions;
