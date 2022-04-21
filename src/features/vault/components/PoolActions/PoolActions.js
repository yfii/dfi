import React from 'react';
import Grid from '@material-ui/core/Grid';

import DepositSection from '../PoolDetails/DepositSection/DepositSection';
import WithdrawSection from '../PoolDetails/WithdrawSection/WithdrawSection';
import HarvestSection from '../PoolDetails/HarvestSection/HarvestSection';
import { shouldHideFromHarvest } from '../../../helpers/utils';
import { NetworkRequired } from '../../../../components/NetworkRequired/NetworkRequired';
import { Box } from '@material-ui/core';

const PoolActions = ({ pool, balanceSingle, index, sharesBalance }) => {
  return (
    <NetworkRequired inline>
      <Grid container>
        {pool.id === 'cakev2-btcb-bnb' ? (
          <Box p={3}>{'Hang tight, this vault is being upgraded and will be back soon.'}</Box>
        ) : (
          <>
            <DepositSection index={index} pool={pool} balanceSingle={balanceSingle} />
            <WithdrawSection index={index} pool={pool} sharesBalance={sharesBalance} />
            {shouldHideFromHarvest(pool.id) ? '' : <HarvestSection index={index} pool={pool} />}
          </>
        )}
      </Grid>
    </NetworkRequired>
  );
};

export default PoolActions;
