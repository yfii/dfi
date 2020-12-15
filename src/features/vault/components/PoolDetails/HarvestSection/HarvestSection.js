import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import BigNumber from 'bignumber.js';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import FormControl from '@material-ui/core/FormControl';

import Button from 'components/CustomButtons/Button.js';
import { useFetchHarvest } from 'features/vault/redux/hooks';
import { useConnectWallet } from 'features/home/redux/hooks';
import styles from './styles';

const useStyles = makeStyles(styles);

const HarvestSection = ({ pool, index, sharesBalance }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchHarvest, fetchHarvestPending } = useFetchHarvest();

  const onHarvest = () => {
    console.log('on harvest');
  };

  return (
    <Grid item xs={12} sm={2} className={classes.sliderDetailContainer}>
      <div className={classes.showDetailBottom}>
        <div className={classes.showDetailLeft}>
          {t('Vault-LastHarvest')}:
        </div>
        <div>
          <Button
            className={`${classes.showDetailButton} ${classes.showDetailButtonOutlined}`}
            type="button"
            color="primary"
            style={{ maxWidth: "100px" }}
            onClick={() => onHarvest()}
          >
            {fetchHarvestPending[index]
              ? `${t('Vault-Harvesting')}`
              : `${t('Vault-HarvestButton')}`}
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default HarvestSection;
