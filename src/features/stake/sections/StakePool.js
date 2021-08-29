import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import {
  useFetchApproval,
  useFetchClaim,
  useFetchExit,
  useFetchStake,
  useFetchWithdraw,
  useLaunchpoolSubscriptions,
  useLaunchpoolUpdates,
  usePoolApr,
  usePoolFinish,
  usePoolStaked,
  usePoolStatus,
  useUserApproval,
  useUserBalance,
  useUserRewardsAvailable,
  useUserStaked,
} from '../redux/hooks';

import {
  Avatar,
  Box,
  Dialog,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
  useTheme,
} from '@material-ui/core';

import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';

import Button from '../../../components/CustomButtons/Button';
import { styles } from './styles/view';
import Divider from '@material-ui/core/Divider';
import { formatApy, formatDecimals, formatPercent } from '../../helpers/format';
import { Helmet } from 'react-helmet';
import { usePageMeta } from '../../common/getPageMeta';
import { launchpools } from '../../helpers/getNetworkData';
import { useSelector } from 'react-redux';
import { StakeCountdown } from './StakeCountdown';
import ValueLoader from '../../common/components/ValueLoader/ValueLoader';
import { NetworkRequired } from '../../../components/NetworkRequired/NetworkRequired';

const useStyles = makeStyles(styles);

export default function StakePool(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { fetchApproval } = useFetchApproval();
  const { fetchStake } = useFetchStake();
  const { fetchWithdraw } = useFetchWithdraw();
  const { fetchClaim } = useFetchClaim();
  const { fetchExit } = useFetchExit();
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { getPageMeta } = usePageMeta();
  const theme = useTheme();
  const isNightMode = theme.palette.type === 'dark';

  // Get pool from url
  const poolId = props.match.params.id;

  const launchpool = useMemo(() => {
    return launchpools[poolId];
  }, [poolId]);

  // Subscribe to updates for this pool
  const { subscribe } = useLaunchpoolSubscriptions();
  useEffect(() => {
    return subscribe(launchpool.id, {
      userApproval: true,
      userBalance: true,
      userStaked: true,
      userRewardsAvailable: true,
      poolStaked: true,
      poolApr: true,
      poolFinish: true,
    });
  }, [subscribe, launchpool]);
  useLaunchpoolUpdates();

  // Get pool state
  const poolHideCountdown = launchpool.fixedStatus === true;
  const poolFinish = usePoolFinish(launchpool.id);
  const poolStatus = usePoolStatus(launchpool.id);
  const poolStaked = usePoolStaked(launchpool.id);
  const poolApr = usePoolApr(launchpool.id);
  const userApproval = useUserApproval(launchpool.id);
  const userBalance = useUserBalance(launchpool.id);
  const userStaked = useUserStaked(launchpool.id);
  const userRewardsAvailable = useUserRewardsAvailable(launchpool.id);

  const fetchApprovalPending = useSelector(
    state => state.stake.fetchApprovalPending[launchpool.id]
  );
  const fetchStakePending = useSelector(state => state.stake.fetchStakePending[launchpool.id]);
  const fetchWithdrawPending = useSelector(
    state => state.stake.fetchWithdrawPending[launchpool.id]
  );
  const fetchClaimPending = useSelector(state => state.stake.fetchClaimPending[launchpool.id]);
  const fetchExitPending = useSelector(state => state.stake.fetchExitPending[launchpool.id]);

  // Countdown timer/status
  const countdownStatus = useMemo(() => {
    if (poolStatus === 'closed') {
      return <>{t('Finished')}</>;
    } else if (poolStatus === 'soon') {
      return <>{t('Coming-Soon')}</>;
    } else if (poolFinish && !poolHideCountdown) {
      return (
        <>
          {t('End') + ': '}
          <StakeCountdown periodFinish={poolFinish} />
        </>
      );
    } else if (poolFinish === undefined && !poolHideCountdown) {
      return <ValueLoader />;
    }

    return <></>;
  }, [poolStatus, poolHideCountdown, poolFinish, t]);

  // Pool Share
  const myPoolShare = useMemo(() => {
    return userStaked.dividedBy(poolStaked).toNumber();
  }, [userStaked, poolStaked]);

  // Modal input change
  const changeInputVal = event => {
    let value = event.target.value;
    const changeIsNumber = /^[0-9]+\.?[0-9]*$/;
    if (!value) return setInputVal(value);
    if (changeIsNumber.test(value)) {
      value = value.replace(/(^[0-9]+)(\.?[0-9]*$)/, (word, p1, p2) => {
        return Number(p1).toString() + p2;
      });
      if (
        new BigNumber(Number(value)).comparedTo(
          showInput === 'stake' ? userBalance : userStaked
        ) === 1
      )
        return setInputVal(showInput === 'stake' ? userBalance.toString() : userStaked.toString());
      setInputVal(value);
    }
  };

  // Approval: Needs approval
  const isNeedApproval = useMemo(() => {
    const stakeAmount = new BigNumber(inputVal);
    return (
      userApproval.isZero() || (showInput === 'stake' && stakeAmount.isGreaterThan(userApproval))
    );
  }, [userApproval, inputVal, showInput]);

  // Approval: Submit tx
  const onApproval = useCallback(() => {
    fetchApproval(poolId);
  }, [fetchApproval, poolId]);

  // Stake: Submit tx
  const onStake = useCallback(() => {
    const amount = new BigNumber(inputVal)
      .multipliedBy(new BigNumber(10).exponentiatedBy(launchpool.tokenDecimals))
      .toString(10);
    fetchStake(poolId, amount);
    setOpen(false);
  }, [fetchStake, inputVal, launchpool, poolId, setOpen]);

  // Withdraw: Submit tx
  const onWithdraw = useCallback(() => {
    const amount = new BigNumber(inputVal)
      .multipliedBy(new BigNumber(10).exponentiatedBy(launchpool.tokenDecimals))
      .toString(10);
    fetchWithdraw(poolId, amount);
    setOpen(false);
  }, [fetchWithdraw, inputVal, launchpool, poolId, setOpen]);

  // Claim: Submit tx
  const onClaim = useCallback(() => {
    fetchClaim(poolId);
  }, [fetchClaim, poolId]);

  // Exit: Submit tx
  const onExit = useCallback(() => {
    fetchExit(poolId);
  }, [fetchExit, poolId]);

  const handleModal = (state, action = false) => {
    setOpen(state);
    setShowInput(action);
    setInputVal(0);
  };

  const customBgImg = img => {
    return img
      ? {
          backgroundImage: 'url(' + require('images/' + img) + ')',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }
      : {};
  };

  return (
    <Grid container>
      <Helmet>
        <title>
          {getPageMeta('Stake-Meta-Title', {
            earnedToken: launchpool.earnedToken,
            boostedBy: launchpool.name,
          })}
        </title>
        <meta
          property="og:title"
          content={getPageMeta('Stake-Meta-Title', {
            earnedToken: launchpool.earnedToken,
            boostedBy: launchpool.name,
          })}
        />
      </Helmet>
      <Grid item xs={6} className={classes.mb}>
        <Button href="/#/stake" className={classes.roundedBtn}>
          {t('Stake-Button-Back')}
        </Button>
      </Grid>
      <Grid item xs={6} className={classes.mb}>
        <Typography className={classes.countdown}>{countdownStatus}</Typography>
      </Grid>

      <Grid
        container
        className={[
          classes.row,
          poolStatus === 'closed' || poolStatus === 'soon' ? classes.retired : '',
        ].join(' ')}
        alignItems="center"
      >
        <Grid item xs={6} sm={6} md={3}>
          <Avatar
            src={require('images/' + launchpool.logo)}
            alt={launchpool.earnedToken}
            variant="square"
            imgProps={{ style: { objectFit: 'contain' } }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography className={classes.title}>
            <NetworkRequired loader>{formatDecimals(userBalance)}</NetworkRequired>
          </Typography>
          <Typography className={classes.tokenTitle}>{launchpool.token}</Typography>
          <Typography className={classes.subtitle}>{t('Vault-Wallet')}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography className={classes.title}>
            <NetworkRequired loader>{formatDecimals(userStaked)}</NetworkRequired>
          </Typography>
          <Typography className={classes.tokenTitle}>{launchpool.token}</Typography>
          <Typography className={classes.subtitle}>{t('Stake-Balancer-Current-Staked')}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography className={classes.title}>
            <NetworkRequired loader>{formatDecimals(userRewardsAvailable)}</NetworkRequired>
          </Typography>
          <Typography className={classes.tokenTitle}>{launchpool.earnedToken}</Typography>
          <Typography className={classes.subtitle}>
            {t('Stake-Balancer-Rewards-Available')}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        className={[
          classes.row,
          poolStatus === 'closed' || poolStatus === 'soon' ? classes.retired : '',
        ].join(' ')}
      >
        <Grid item xs={12} sm={4}>
          <Typography className={classes.title}>{formatDecimals(poolStaked)}</Typography>
          <Typography className={classes.subtitle}>
            {t('Stake-Total-Value-Locked', { mooToken: launchpool.token })}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className={classes.title}>
            <NetworkRequired loader>{formatPercent(myPoolShare, 4)}</NetworkRequired>
          </Typography>
          <Typography className={classes.subtitle}>{t('Stake-Your-Pool')}%</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className={classes.title}>{formatApy(poolApr)}</Typography>
          <Typography className={classes.subtitle}>{t('Vault-APR')}</Typography>
        </Grid>

        {poolStatus === 'closed' || poolStatus === 'soon' ? (
          <Box className={classes.ribbon}>
            <span className={poolStatus}>
              {poolStatus === 'closed'
                ? t('Finished')
                : poolStatus === 'soon'
                ? t('Coming-Soon')
                : ''}
            </span>
          </Box>
        ) : (
          ''
        )}
      </Grid>

      <NetworkRequired>
        <Grid container className={classes.row}>
          {launchpool.partnership ? (
            <Box className={classes.boosted}>{t('Stake-BoostedBy', { name: launchpool.name })}</Box>
          ) : (
            ''
          )}
          <Grid item xs={12} md={6} lg={3}>
            {isNeedApproval ? (
              <Button
                className={classes.actionBtn}
                disabled={fetchApprovalPending}
                onClick={onApproval}
              >
                {t('Stake-Button-Approval')}
              </Button>
            ) : (
              <Button
                className={[classes.actionBtn, launchpool.partnership ? classes.btnBoost : ''].join(
                  ' '
                )}
                disabled={fetchStakePending || userBalance.isZero()}
                onClick={() => {
                  handleModal(true, 'stake');
                }}
              >
                {launchpool.partnership ? (
                  <Box className={classes.boost}>
                    <Box>
                      <Avatar
                        src={require('images/' + launchpool.logo)}
                        alt={launchpool.token}
                        variant="square"
                        imgProps={{ style: { objectFit: 'contain' } }}
                      />
                    </Box>
                    <Box>
                      <img
                        alt={t('Boost')}
                        className={classes.boostImg}
                        src={require('images/stake/boost.svg')}
                      />
                    </Box>
                  </Box>
                ) : (
                  t('Stake-Button-Stake-Tokens')
                )}
              </Button>
            )}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Button
              className={classes.actionBtn}
              disabled={fetchWithdrawPending || userStaked.isZero()}
              onClick={() => {
                handleModal(true, 'unstake');
              }}
            >
              {t('Stake-Button-Unstake-Tokens')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Button
              className={classes.actionBtn}
              disabled={fetchClaimPending || userRewardsAvailable.isZero()}
              onClick={onClaim}
            >
              {t('Stake-Button-Claim-Rewards')}
            </Button>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Button
              className={classes.actionBtn}
              disabled={fetchExitPending || userStaked.isZero() || userRewardsAvailable.isZero()}
              onClick={onExit}
            >
              {t('Stake-Button-Exit')}
            </Button>
          </Grid>
        </Grid>
      </NetworkRequired>

      {launchpool.partners.map(partner => (
        <Grid
          container
          key={partner.website}
          className={classes.row}
          style={customBgImg(partner.background)}
        >
          <Grid item xs={12} className={classes.partnerHeader}>
            <Link target="_blank" href={partner.website}>
              {isNightMode && partner.logoNight ? (
                <img
                  alt={launchpool.name}
                  src={require('images/' + partner.logoNight)}
                  height="60"
                />
              ) : partner.logo ? (
                <img alt={launchpool.name} src={require('images/' + partner.logo)} height="60" />
              ) : (
                ''
              )}
            </Link>
          </Grid>
          <Grid item xs={12} className={classes.partnerBody}>
            {partner.text}
          </Grid>
          <Grid item xs={12}>
            <Divider className={classes.divider} />
            {partner.social.twitter ? (
              <Link href={partner.social.twitter}>
                <TwitterIcon />
              </Link>
            ) : (
              ''
            )}
            {partner.social.telegram ? (
              <Link href={partner.social.telegram}>
                <TelegramIcon />
              </Link>
            ) : (
              ''
            )}
            {partner.website ? (
              <Grid item xs={12}>
                <Link target="_blank" href={partner.website}>
                  {partner.website}
                </Link>
              </Grid>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      ))}

      <Dialog
        onClose={() => {
          handleModal(false);
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Grid container className={classes.modal}>
          <Grid item xs={12}>
            <Typography className={classes.h1}>Stake your tokens</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              className={classes.balance}
              onClick={() => {
                setInputVal(showInput === 'stake' ? userBalance.toString() : userStaked.toString());
              }}
            >
              {launchpool.token} Balance:{' '}
              {showInput === 'stake' ? userBalance.toString() : userStaked.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <TextField
                className={classes.input}
                value={inputVal}
                onChange={changeInputVal}
                autoFocus
              />
            </form>
          </Grid>
          <Grid item xs={12} className={classes.modalbtns}>
            <Button onClick={() => handleModal(false)} className={classes.actionBtn}>
              {t('Stake-Button-Back')}
            </Button>
            <Button
              className={[
                classes.actionBtn,
                launchpool.partnership && showInput === 'stake' && !isNeedApproval
                  ? classes.btnBoost
                  : '',
              ].join(' ')}
              disabled={
                showInput === 'stake'
                  ? fetchStakePending || (fetchApprovalPending && isNeedApproval)
                  : fetchWithdrawPending
              }
              onClick={showInput === 'stake' ? (isNeedApproval ? onApproval : onStake) : onWithdraw}
            >
              {showInput === 'stake' ? (
                isNeedApproval ? (
                  t('Stake-Button-Approval')
                ) : launchpool.partnership ? (
                  <Box className={classes.boost}>
                    <Box>
                      <Avatar
                        src={require('images/' + launchpool.logo)}
                        alt={launchpool.earnedToken}
                        variant="square"
                        imgProps={{ style: { objectFit: 'contain' } }}
                      />
                    </Box>
                    <Box>
                      <img
                        alt={t('Boost')}
                        className={classes.boostImg}
                        src={require('images/stake/boost.svg')}
                      />
                    </Box>
                  </Box>
                ) : (
                  t('Stake-Button-Stake-Tokens')
                )
              ) : (
                t('Stake-Button-Unstake-Tokens')
              )}
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </Grid>
  );
}
