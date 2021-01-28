import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { useConnectWallet } from '../../../home/redux/hooks';
import { useFetchPoolsInfo } from '../../redux/hooks';
import PoolCard from '../PoolCard/PoolCard';
import StakingDialog from '../StakingDialog/StakingDialog';
import Switch from '../Switch/Switch';

import styles from './styles';
import banner from './banner.png';
import barn from './barn.png';
import mobileBanner from './mobile_banner.png';
import projects from './projects.png';

const FETCH_INTERVAL_MS = 30 * 1000;
const switchOptions = ['TWT', 'BIFI'];

const useStyles = makeStyles(styles);

export default function StakePools() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { pools, fetchPoolsInfo } = useFetchPoolsInfo();
  const { web3, address } = useConnectWallet();

  const [switchValue, setSwitchValue] = useState(switchOptions[0]);
  const [action, setAction] = useState(null);
  const [currentPool, setCurrentPool] = useState(null);

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

  const handleCloseStakingDialog = () => {
    setAction(null);
    setCurrentPool(null);
  };

  return (
    <>
      <Hidden xsDown>
        <img className={classes.banner} src={banner} alt="stake TWT earn IFO tokens" />
      </Hidden>
      <Hidden smUp>
        <img className={classes.banner} src={mobileBanner} alt="stake TWT earn IFO tokens" />
      </Hidden>
      <div className={classes.poweredByBeefy}>{t('Powered-By')} BEEFY.FINANCE</div>
      <Switch
        className={classes.switch}
        value={switchValue}
        onChange={setSwitchValue}
        options={switchOptions}
      />
      <Grid className={classes.pools} container spacing={8}>
        {pools
          .filter(pool => pool.partner === switchValue)
          .map(pool => (
            <Grid key={`${pool.symbol} ${pool.rewardsSymbol}`} item xs={12} md={6} lg={5} xl={4}>
              <PoolCard
                pool={pool}
                onStake={() => {
                  setAction('stake');
                  setCurrentPool(pool);
                }}
                onUnstake={() => {
                  setAction('unstake');
                  setCurrentPool(pool);
                }}
                onHarvest={() => {}}
              />
            </Grid>
          ))}
      </Grid>
      <Grid className={classNames(classes.imageContainer, classes.barn)} container>
        <Grid item xs={6} md={2}>
          <img className={classes.image} src={barn} alt="the barn of trust" />
        </Grid>
      </Grid>
      <Grid className={classNames(classes.imageContainer, classes.projects)} container>
        <Grid item xs={12} md={5}>
          <img className={classes.image} src={projects} alt="project logos" />
          <div className={classes.links}>
            <a href="https://beefy.finance/" target="_blank" rel="noopener noreferrer">
              beefy.finance
            </a>
            <a href="https://trustwallet.com/" target="_blank" rel="noopener noreferrer">
              Trust Wallet
            </a>
            <a
              href="https://docs.beefy.finance/beefyfinance/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('IFO-Guide')}
            </a>
          </div>
        </Grid>
      </Grid>
      <StakingDialog
        open={action === 'stake'}
        onClose={handleCloseStakingDialog}
        inputLabel={t('Available-To-Stake')}
        submitLabel={t('Stake')}
        onSubmit={value => {
          handleCloseStakingDialog();
        }}
        pool={currentPool}
        availableAmount={currentPool && currentPool.balance}
      />
      <StakingDialog
        open={action === 'unstake'}
        onClose={handleCloseStakingDialog}
        inputLabel={t('Available-To-Unstake')}
        submitLabel={t('Unstake')}
        onSubmit={value => {
          handleCloseStakingDialog();
        }}
        pool={currentPool}
        availableAmount={currentPool && currentPool.stakedBalance}
      />
    </>
  );
}
