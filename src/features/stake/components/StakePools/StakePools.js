import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchPoolsInfo } from '../../redux/hooks';
import PoolCard from '../PoolCard/PoolCard';

import styles from './styles';
import banner from './banner.png';
import barn from './barn.png';
import projects from './projects.png';

const FETCH_INTERVAL_MS = 30 * 1000;

const useStyles = makeStyles(styles);

export default function StakePools() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pools, fetchPoolsInfo } = useFetchPoolsInfo();
  const { web3, address } = useConnectWallet();

  useEffect(() => {
    if (address && web3) {
      fetchPoolsInfo({ address, web3, pools });
      const id = setInterval(() => {
        fetchPoolsInfo({ address, web3, pools });
      }, FETCH_INTERVAL_MS);
      return () => clearInterval(id);
    }

    // Adding pools to this dep list, causes an endless loop, DDoSing the api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, web3, fetchPoolsInfo]);

  return (
    <>
      <img className={classes.banner} src={banner} />
      <div className={classes.poweredByBeefy}>{t('Powered-By')} BEEFY.FINANCE</div>
      <Grid container spacing={8}>
        {pools.map(pool => (
          <Grid key={pool.id} item xs={12} md={4}>
            <PoolCard pool={pool} />
          </Grid>
        ))}
      </Grid>
      <Grid className={classNames(classes.imageContainer, classes.barn)} container>
        <Grid item xs={6} md={2}>
          <img className={classes.image} src={barn} />
        </Grid>
      </Grid>
      <Grid className={classNames(classes.imageContainer, classes.projects)} container>
        <Grid item xs={12} md={4}>
          <img className={classes.image} src={projects} />
        </Grid>
      </Grid>
    </>
  )
}
