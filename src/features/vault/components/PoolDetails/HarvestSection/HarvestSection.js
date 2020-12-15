import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import Button from 'components/CustomButtons/Button.js';
import { useFetchHarvest } from 'features/vault/redux/hooks';
import { useConnectWallet } from 'features/home/redux/hooks';
import styles from './styles';

const useStyles = makeStyles(styles);

const HarvestSection = ({ pool, index }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { web3, address } = useConnectWallet();
  const { enqueueSnackbar } = useSnackbar();
  const { fetchHarvest, fetchHarvestPending } = useFetchHarvest();

  const onHarvest = () => {
    fetchHarvest({
      address,
      web3,
      contractAddress: pool.earnContractAddress,
      index,
    })
      .then(() => enqueueSnackbar(`Harvest success`, { variant: 'success' }))
      .catch(error => enqueueSnackbar(`Harvest error: ${error}`, { variant: 'error' }));
  };

  return (
    <Grid item xs={12} sm={2} className={classes.sliderDetailContainer}>
      <div className={classes.showDetailBottom}>
        <div className={classes.showDetailLeft}>
          {/* {t('Vault-LastHarvest')}: */}
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
