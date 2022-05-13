import React from 'react';
import Grid from '@material-ui/core/Grid';
import DepositSection from '../PoolDetails/DepositSection/DepositSection';
import WithdrawSection from '../PoolDetails/WithdrawSection/WithdrawSection';
import HarvestSection from '../PoolDetails/HarvestSection/HarvestSection';
import { shouldHideFromHarvest } from '../../../helpers/utils';
import { NetworkRequired } from '../../../../components/NetworkRequired/NetworkRequired';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  notice: {
    backgroundColor: theme.palette.background.extra,
    padding: '16px',
    border: '1px solid ' + theme.palette.background.border,
    color: theme.palette.text.primary,
    fontSize: '16px',
    fontWeight: '400',
    width: '100%',
    marginTop: '24px',
  },
}));

const PoolActions = ({ pool, balanceSingle, index, sharesBalance }) => {
  const classes = useStyles();

  return (
    <NetworkRequired inline>
      <Grid container>
        {window.REACT_APP_NETWORK_ID === 42262 ? (
          <div className={classes.notice}>
            <strong>Note: </strong>
            Please ensure your transaction's gas limit is under 10,000,000. Oasis RPCs are currently
            overestimating the amount of gas needed for a transaction.
          </div>
        ) : null}
        <DepositSection index={index} pool={pool} balanceSingle={balanceSingle} />
        <WithdrawSection index={index} pool={pool} sharesBalance={sharesBalance} />
        {shouldHideFromHarvest(pool.id) ? '' : <HarvestSection index={index} pool={pool} />}
      </Grid>
    </NetworkRequired>
  );
};

export default PoolActions;
