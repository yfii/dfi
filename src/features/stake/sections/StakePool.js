import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js';
import { byDecimals } from 'features/helpers/bignumber';
import { useConnectWallet } from '../../home/redux/hooks';
import {
  useCheckApproval,
  useFetchApproval,
  useFetchBalance,
  useFetchClaim,
  useFetchCurrentlyStaked,
  useFetchExit,
  useFetchHalfTime,
  useFetchPoolData,
  useFetchRewardsAvailable,
  useFetchStake,
  useFetchWithdraw,
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
} from '@material-ui/core';

import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';

import Button from '../../../components/CustomButtons/Button';
import { styles } from './styles/view';
import Divider from '@material-ui/core/Divider';
import { formatApy, formatCountdown } from '../../helpers/format';
import { Helmet } from 'react-helmet';
import { getNetworkFriendlyName } from '../../helpers/getNetworkData';
import { getPageMeta, usePageMeta } from '../../common/getPageMeta';

const useStyles = makeStyles(styles);

export default function StakePool(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { address } = useConnectWallet();
  const { allowance, checkApproval } = useCheckApproval();
  const { balance, fetchBalance } = useFetchBalance();
  const { currentlyStaked, fetchCurrentlyStaked } = useFetchCurrentlyStaked();
  const { rewardsAvailable, fetchRewardsAvailable } = useFetchRewardsAvailable();
  const { halfTime, fetchHalfTime } = useFetchHalfTime();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchStake, fetchStakePending } = useFetchStake();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const { fetchClaim, fetchClaimPending } = useFetchClaim();
  const { fetchExit, fetchExitPending } = useFetchExit();
  const { pools, poolData, fetchPoolData } = useFetchPoolData();
  const [index, setIndex] = useState(Number(props.match.params.index) - 1);
  const [showInput, setShowInput] = useState(false);
  const [isNeedApproval, setIsNeedApproval] = useState(true);
  const [approvalAble, setApprovalAble] = useState(true);
  const [stakeAble, setStakeAble] = useState(true);
  const [withdrawAble, setWithdrawAble] = useState(true);
  const [claimAble, setClaimAble] = useState(true);
  const [exitAble, setExitAble] = useState(true);
  const [myBalance, setMyBalance] = useState(new BigNumber(balance[index]));
  const [myCurrentlyStaked, setMyCurrentlyStaked] = useState(new BigNumber(currentlyStaked[index]));
  const [myRewardsAvailable, setMyRewardsAvailable] = useState(
    new BigNumber(rewardsAvailable[index])
  );
  const [myHalfTime, setMyHalfTime] = useState(`0day 00:00:00`);
  const [inputVal, setInputVal] = useState(0);
  const [open, setOpen] = React.useState(false);
  const { getPageMeta } = usePageMeta();

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
          showInput === 'stake' ? myBalance : myCurrentlyStaked
        ) === 1
      )
        return setInputVal(
          showInput === 'stake' ? myBalance.toString() : myCurrentlyStaked.toString()
        );
      setInputVal(value);
    }
  };

  useEffect(() => {
    setIndex(Number(props.match.params.index) - 1);
  }, [Number(props.match.params.index)]);

  useEffect(() => {
    setIsNeedApproval(Boolean(allowance[index] === 0));
  }, [allowance[index], index]);

  useEffect(() => {
    setApprovalAble(!Boolean(fetchApprovalPending[index]));
  }, [fetchApprovalPending[index], index]);

  const onApproval = () => {
    fetchApproval(index);
  };

  useEffect(() => {
    setStakeAble(!Boolean(fetchStakePending[index]));
  }, [fetchStakePending[index], index]);

  const onStake = () => {
    const amount = new BigNumber(inputVal)
      .multipliedBy(new BigNumber(10).exponentiatedBy(pools[index].tokenDecimals))
      .toString(10);
    fetchStake(index, amount);
    setOpen(false);
  };

  useEffect(() => {
    const isPending = Boolean(fetchWithdrawPending[index]);
    setWithdrawAble(!isPending);
  }, [fetchWithdrawPending[index], index]);

  const onWithdraw = () => {
    const amount = new BigNumber(inputVal)
      .multipliedBy(new BigNumber(10).exponentiatedBy(pools[index].tokenDecimals))
      .toString(10);
    fetchWithdraw(index, amount);
    setOpen(false);
  };

  useEffect(() => {
    const isPending = Boolean(fetchClaimPending[index]);
    const rewardsAvailableIs0 = rewardsAvailable[index] === 0;
    setClaimAble(!Boolean(isPending || rewardsAvailableIs0));
  }, [rewardsAvailable[index], fetchClaimPending[index], index]);

  const onClaim = () => {
    fetchClaim(index);
  };

  useEffect(() => {
    const isPending = Boolean(fetchExitPending[index]);
    setExitAble(!Boolean(isPending));
  }, [fetchExitPending[index], index]);

  const onExit = () => {
    fetchExit(index);
  };

  useEffect(() => {
    const amount = byDecimals(balance[index], pools[index].tokenDecimals);
    setMyBalance(amount);
  }, [balance[index], index]);

  useEffect(() => {
    const amount = byDecimals(currentlyStaked[index], pools[index].tokenDecimals);
    setMyCurrentlyStaked(amount);
  }, [currentlyStaked[index], index]);

  useEffect(() => {
    let amount = byDecimals(rewardsAvailable[index], pools[index].earnedTokenDecimals);
    if (pools[index].token === 'mooAutoWbnbFixed') {
      amount = amount.multipliedBy(96).dividedBy(100);
    }
    setMyRewardsAvailable(amount);
  }, [rewardsAvailable[index], index]);

  useEffect(() => {
    if (halfTime[index] == 0) {
      if (!pools[index].hideCountdown === true) {
        pools[index].status = 'soon';
      }
      return;
    }
    const formatTime = () => {
      const deadline = halfTime[index] * 1000;
      const time = deadline - new Date().getTime();
      if (time <= 0) {
        if (!pools[index].hideCountdown === true) {
          pools[index].status = 'closed';
        }
        return fetchHalfTime(index);
      }
      setMyHalfTime(formatCountdown(deadline));
    };
    formatTime();
    const id = setInterval(formatTime, 1000);
    return () => clearInterval(id);
  }, [halfTime[index], pools, index]);

  useEffect(() => {
    if (address) {
      checkApproval(index);
      fetchBalance(index);
      fetchCurrentlyStaked(index);
      fetchRewardsAvailable(index);
    }
    fetchHalfTime(index);
    fetchPoolData(index);
    const id = setInterval(() => {
      if (address) {
        checkApproval(index);
        fetchBalance(index);
        fetchCurrentlyStaked(index);
        fetchRewardsAvailable(index);
      }
      fetchHalfTime(index);
      fetchPoolData(index);
    }, 10000);
    return () => clearInterval(id);
  }, [address, index]);

  const handleModal = (state, action = false) => {
    setOpen(state);
    setShowInput(action);
    setInputVal(0);
  };

  const getPoolShare = () => {
    return myCurrentlyStaked.toNumber() > 0
      ? (
          (Math.floor(myCurrentlyStaked.toNumber() * 10000) / 10000 / poolData[index].staked) *
          100
        ).toFixed(4)
      : 0;
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
            earnedToken: pools[index].earnedToken,
            boostedBy: pools[index].name,
          })}
        </title>
        <meta
          property="og:title"
          content={getPageMeta('Stake-Meta-Title', {
            earnedToken: pools[index].earnedToken,
            boostedBy: pools[index].name,
          })}
        />
      </Helmet>
      <Grid item xs={6} className={classes.mb}>
        <Button href="/stake" className={classes.roundedBtn}>
          {t('Stake-Button-Back')}
        </Button>
      </Grid>
      <Grid item xs={6} className={classes.mb}>
        <Typography className={classes.countdown}>
          {pools[index].hideCountdown
            ? ''
            : pools[index].status === 'closed'
            ? t('Finished')
            : pools[index].status === 'soon'
            ? t('Coming-Soon')
            : t('End') + ': ' + myHalfTime}
        </Typography>
      </Grid>

      <Grid
        container
        className={[
          classes.row,
          pools[index].status === 'closed' || pools[index].status === 'soon' ? classes.retired : '',
        ].join(' ')}
      >
        <Grid item xs={6} sm={6} md={3}>
          <Avatar
            src={require('images/' + pools[index].logo)}
            alt={pools.earnedToken}
            variant="square"
            imgProps={{ style: { objectFit: 'contain' } }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography className={classes.title}>{`${
            Math.floor(myBalance.toNumber() * 10000) / 10000
          } ${
            pools[index].token === 'mooAutoWbnbFixed' ? 'mooAutoWBNB' : pools[index].token
          }`}</Typography>
          <Typography className={classes.subtitle}>{t('Stake-Balancer-Your-Balance')}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Typography className={classes.title}>{`${
            Math.floor(myCurrentlyStaked.toNumber() * 10000) / 10000
          } ${
            pools[index].token === 'mooAutoWbnbFixed' ? 'mooAutoWBNB' : pools[index].token
          }`}</Typography>
          <Typography className={classes.subtitle}>{t('Stake-Balancer-Current-Staked')}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={3}>
          <Box display="flex" justifyContent={'center'}>
            <Typography className={classes.title}>{`${
              Math.floor(myRewardsAvailable.toNumber() * 10000) / 10000
            } ${pools[index].earnedToken}`}</Typography>
            <Avatar className={classes.fire} src={require('images/stake/fire.png')} />
          </Box>
          <Typography className={classes.subtitle}>
            {t('Stake-Balancer-Rewards-Available')}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        className={[
          classes.row,
          pools[index].status === 'closed' || pools[index].status === 'soon' ? classes.retired : '',
        ].join(' ')}
      >
        <Grid item xs={12} sm={4}>
          <Typography className={classes.title}>{poolData[index].staked}</Typography>
          <Typography className={classes.subtitle}>
            {t('Stake-Total-Value-Locked', { mooToken: pools[index].token })}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className={classes.title}>{getPoolShare()}%</Typography>
          <Typography className={classes.subtitle}>{t('Stake-Your-Pool')}%</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography className={classes.title}>{formatApy(poolData[index].apy)}</Typography>
          <Typography className={classes.subtitle}>{t('Vault-APR')}</Typography>
        </Grid>

        {pools[index].status === 'closed' || pools[index].status === 'soon' ? (
          <Box className={classes.ribbon}>
            <span className={pools[index].status}>
              {pools[index].status === 'closed'
                ? t('Finished')
                : pools[index].status === 'soon'
                ? t('Coming-Soon')
                : ''}
            </span>
          </Box>
        ) : (
          ''
        )}
      </Grid>

      <Grid container className={classes.row}>
        {pools[index].partnership ? (
          <Box className={classes.boosted}>{t('Stake-BoostedBy', { name: pools[index].name })}</Box>
        ) : (
          ''
        )}
        <Grid item xs={12} md={6} lg={3}>
          {isNeedApproval ? (
            <Button
              className={classes.actionBtn}
              disabled={!Boolean(approvalAble)}
              onClick={onApproval}
            >
              {t('Stake-Button-Approval')}
            </Button>
          ) : (
            <Button
              className={[classes.actionBtn, pools[index].partnership ? classes.btnBoost : ''].join(
                ' '
              )}
              onClick={() => {
                handleModal(true, 'stake');
              }}
            >
              {pools[index].partnership ? (
                <Box className={classes.boost}>
                  <Box>
                    <Avatar
                      src={require('images/' + pools[index].logo)}
                      alt={pools.earnedToken}
                      variant="square"
                      imgProps={{ style: { objectFit: 'contain' } }}
                    />
                  </Box>
                  <Box>
                    <img className={classes.boostImg} src={require('images/stake/boost.svg')} />
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
            disabled={!Boolean(withdrawAble)}
            onClick={() => {
              handleModal(true, 'unstake');
            }}
          >
            {t('Stake-Button-Unstake-Tokens')}
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button className={classes.actionBtn} disabled={!Boolean(claimAble)} onClick={onClaim}>
            {t('Stake-Button-Claim-Rewards')}
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button className={classes.actionBtn} disabled={!Boolean(exitAble)} onClick={onExit}>
            {t('Stake-Button-Exit')}
          </Button>
        </Grid>
      </Grid>

      {pools[index].partners.map(partner => (
        <Grid container className={classes.row} style={customBgImg(partner.background)}>
          <Grid item xs={12} className={classes.partnerHeader}>
            {partner.logo ? (
              <img alt={pools[index].name} src={require('images/' + partner.logo)} height="60" />
            ) : (
              ''
            )}
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
                setInputVal(
                  showInput === 'stake' ? myBalance.toString() : myCurrentlyStaked.toString()
                );
              }}
            >
              {pools[index].token} Balance:{' '}
              {showInput === 'stake' ? myBalance.toString() : myCurrentlyStaked.toString()}
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
                pools[index].partnership && showInput === 'stake' ? classes.btnBoost : '',
              ].join(' ')}
              disabled={!Boolean(showInput === 'stake' ? stakeAble : withdrawAble)}
              onClick={showInput === 'stake' ? onStake : onWithdraw}
            >
              {showInput === 'stake' ? (
                pools[index].partnership ? (
                  <Box className={classes.boost}>
                    <Box>
                      <Avatar
                        src={require('images/' + pools[index].logo)}
                        alt={pools.earnedToken}
                        variant="square"
                        imgProps={{ style: { objectFit: 'contain' } }}
                      />
                    </Box>
                    <Box>
                      <img className={classes.boostImg} src={require('images/stake/boost.svg')} />
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
