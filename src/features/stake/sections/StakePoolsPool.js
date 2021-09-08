import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { StakeCountdown } from './StakeCountdown';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import Button from '../../../components/CustomButtons/Button';
import ValueLoader from '../../common/components/ValueLoader/ValueLoader';
import { useLaunchpoolSubscriptions, usePoolFinish, usePoolStatus } from '../redux/hooks';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { getSingleAssetSrc } from '../../helpers/getSingleAssetSrc';

export function StakePoolsPool({ showPools, classes, pool, t }) {
  const { chain } = useParams();
  const id = pool.id;
  const hideCountdown = pool.fixedStatus === true;
  const poolFinish = usePoolFinish(pool.id);
  const status = usePoolStatus(pool.id);
  const { subscribe } = useLaunchpoolSubscriptions();

  const countdownStatus = useMemo(() => {
    if (status === 'closed') {
      return <>{t('Finished')}</>;
    } else if (status === 'soon') {
      return <>{t('Coming-Soon')}</>;
    } else if (poolFinish && !hideCountdown) {
      return <StakeCountdown periodFinish={poolFinish} />;
    } else if (poolFinish === undefined && !hideCountdown) {
      return <ValueLoader />;
    }

    return <></>;
  }, [status, hideCountdown, poolFinish, t]);

  useEffect(() => {
    return subscribe(id, {
      poolFinish: status !== 'closed',
    });
  }, [subscribe, id, status]);

  let avatar;
  if (pool.logo) {
    avatar = (
      <Avatar
        src={require('images/' + pool.logo)}
        alt={pool.token}
        variant="square"
        imgProps={{ style: { objectFit: 'contain' } }}
      />
    );
  } else {
    avatar = (
      <AvatarGroup className={`${classes.icon} MuiAvatar-root MuiAvatar-square`} spacing="small">
        <Avatar
          alt={pool.assets[0]}
          variant="square"
          imgProps={{ style: { objectFit: 'contain' } }}
          src={getSingleAssetSrc(pool.assets[0])}
        />
        <Avatar
          alt={pool.assets[1]}
          variant="square"
          imgProps={{ style: { objectFit: 'contain' } }}
          src={getSingleAssetSrc(pool.assets[1])}
        />
      </AvatarGroup>
    );
  }

  if (
    showPools === 'all' ||
    (showPools === 'active' && status === showPools) ||
    (showPools === 'active' && status === 'soon') ||
    (showPools === 'closed' && status === showPools)
  ) {
    return (
      <Grid xs={12} sm={6} md={6} lg={3} item>
        <Grid
          className={[
            classes.item,
            status === 'closed' ? classes.itemRetired : status === 'soon' ? classes.itemSoon : '',
          ].join(' ')}
        >
          {pool.partnership ? (
            <Box className={classes.boosted}>{t('Stake-BoostedBy', { name: pool.name })}</Box>
          ) : (
            ''
          )}
          <Typography className={classes.title} variant="body2" gutterBottom>
            Earn {pool.earnedToken}
          </Typography>
          {avatar}

          <Typography className={classes.countdown}>{countdownStatus}</Typography>

          <Typography className={classes.subtitle} variant="body2">
            {pool.token}
          </Typography>
          <Link to={`/${chain}/stake/pool/${pool.id}`}>
            <Button xs={5} md={2} className={classes.stakeBtn}>
              {status === 'closed' ? t('Stake-Button-Claim') : t('Stake-Button-Stake')}
            </Button>
          </Link>
          {status === 'closed' || status === 'soon' ? (
            <Box className={classes.ribbon}>
              <span className={status}>
                {status === 'closed' ? t('Finished') : t('Coming-Soon')}
              </span>
            </Box>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    );
  }

  return null;
}
