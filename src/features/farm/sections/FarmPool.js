import React, {useState, useEffect} from 'react';
import classNames from "classnames";
import {useTranslation} from 'react-i18next';
import BigNumber from 'bignumber.js'
import {byDecimals} from 'features/helpers/bignumber';
import {withStyles, makeStyles} from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomButtons from "components/CustomButtons/Button.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {farmPoolsStyle} from "../jss/sections/farmPoolsStyle";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import farmItemStyle from "../jss/sections/farmItemStyle";
import Button from "../../../components/CustomButtons/Button";

import {useConnectWallet} from '../../home/redux/hooks';
import {
  useCheckApproval,
  useFetchPoolsInfo,
  useFetchBalance,
  useFetchCurrentlyStaked,
  useFetchRewardsAvailable,
  useFetchApproval,
  useFetchStake,
  useFetchWithdraw,
  useFetchClaim,
  useFetchExit
} from '../redux/hooks';

const useStyles = makeStyles(farmPoolsStyle);

export default function FarmPool(props) {
  const classes = useStyles();
  const {t, i18n} = useTranslation();
  const {address} = useConnectWallet();
  const {allowance, checkApproval} = useCheckApproval();
  const {pools} = useFetchPoolsInfo();
  const {balance, fetchBalance} = useFetchBalance();
  const {currentlyStaked, fetchCurrentlyStaked} = useFetchCurrentlyStaked();
  const {rewardsAvailable, fetchRewardsAvailable} = useFetchRewardsAvailable();
  const {fetchApproval, fetchApprovalPending} = useFetchApproval();
  const {fetchStake, fetchStakePending} = useFetchStake();
  const {fetchWithdraw, fetchWithdrawPending} = useFetchWithdraw();
  const {fetchClaim, fetchClaimPending} = useFetchClaim();
  const {fetchExit, fetchExitPending} = useFetchExit();
  const [index, setIndex] = useState(Number(props.match.params.index) - 1);
  const [showInput, setShowInput] = useState(false);
  // const [ pageSize,setPageSize ] = useState('');
  const [isNeedApproval, setIsNeedApproval] = useState(true);
  const [approvalAble, setApprovalAble] = useState(false);
  const [stakeAble, setStakeAble] = useState(true);
  const [withdrawAble, setWithdraw] = useState(true);
  const [claimAble, setClaimAble] = useState(true);
  const [exitAble, setExitAble] = useState(true);
  const [myBalance, setMyBalance] = useState(new BigNumber(balance[index]));
  const [myCurrentlyStaked, setMyCurrentlyStaked] = useState(new BigNumber(currentlyStaked[index]));
  const [myRewardsAvailable, setMyRewardsAvailable] = useState(new BigNumber(rewardsAvailable[index]));
  const [myHalfTime, setMyHalfTime] = useState(`0day 00:00:00`);
  const [inputVal, setInputVal] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const changeInputVal = (event) => {
    let value = event.target.value;
    const changeIsNumber = /^[0-9]+\.?[0-9]*$/;
    if (!value) return setInputVal(value);
    if (changeIsNumber.test(value)) {
      value = value.replace(/(^[0-9]+)(\.?[0-9]*$)/, (word, p1, p2) => {
        return Number(p1).toString() + p2;
      });
      if (new BigNumber(Number(value)).comparedTo(showInput === 'stake' ? myBalance : myCurrentlyStaked) === 1) return setInputVal((showInput === 'stake' ? myBalance.toString() : myCurrentlyStaked.toString()));
      setInputVal(value)
    }
  }

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
  }

  useEffect(() => {
    setStakeAble(!Boolean(fetchStakePending[index]));
  }, [fetchStakePending[index], index]);

  const onStake = () => {
    const amount = new BigNumber(inputVal).multipliedBy(new BigNumber(10).exponentiatedBy(pools[index].tokenDecimals)).toString(10);
    fetchStake(index, amount);
  }

  useEffect(() => {
    const isPending = Boolean(fetchWithdrawPending[index]);
    const currentlyStakedIs0 = currentlyStaked[index] === 0;
    setWithdraw(!Boolean(isPending || currentlyStakedIs0));
  }, [currentlyStaked[index], fetchWithdrawPending[index], index, new Date()]);

  const onWithdraw = () => {
    const amount = new BigNumber(inputVal).multipliedBy(new BigNumber(10).exponentiatedBy(pools[index].tokenDecimals)).toString(10);
    fetchWithdraw(index, amount);
  }

  useEffect(() => {
    const isPending = Boolean(fetchClaimPending[index]);
    const rewardsAvailableIs0 = rewardsAvailable[index] === 0;
    setClaimAble(!Boolean(isPending || rewardsAvailableIs0));
  }, [rewardsAvailable[index], fetchClaimPending[index], index]);

  const onClaim = () => {
    fetchClaim(index);
  }

  useEffect(() => {
    const isPending = Boolean(fetchExitPending[index]);
    const currentlyStakedIs0 = currentlyStaked[index] === 0;
    const rewardsAvailableIs0 = rewardsAvailable[index] === 0;
    const currentlyStakedAndRewardsAvailableIs0 = Boolean(currentlyStakedIs0 && rewardsAvailableIs0);
    setExitAble(!Boolean(isPending || currentlyStakedAndRewardsAvailableIs0));
  }, [currentlyStaked[index], rewardsAvailable[index], fetchExitPending[index], index, new Date()]);

  const onExit = () => {
    fetchExit(index);
  }

  useEffect(() => {
    const amount = byDecimals(balance[index], pools[index].tokenDecimals);
    setMyBalance(amount);
  }, [balance[index], index]);

  useEffect(() => {
    const amount = byDecimals(currentlyStaked[index], pools[index].tokenDecimals);
    setMyCurrentlyStaked(amount);
  }, [currentlyStaked[index], index]);

  useEffect(() => {
    const amount = byDecimals(rewardsAvailable[index], pools[index].earnedTokenDecimals);
    setMyRewardsAvailable(amount);
  }, [rewardsAvailable[index], index]);

  useEffect(() => {
    if (address) {
      checkApproval(index);
      fetchBalance(index);
      fetchCurrentlyStaked(index);
      fetchRewardsAvailable(index);
      const id = setInterval(() => {
        checkApproval(index);
        fetchBalance(index);
        fetchCurrentlyStaked(index);
        fetchRewardsAvailable(index);
      }, 10000);
      return () => clearInterval(id);
    }
  }, [address, index]);

  const {name, token, earnTime, earnedToken, earnedTokenUrl} = pools[index];
  const isLP = name.toLowerCase().indexOf('lp') > -1;
  const lpTokens = isLP ? token.split('/') : [];
  const offsetImageStyle = {marginLeft: "-25%", zIndex: 0, background: '#ffffff'};
  const tokenName = isLP ? `${token.toUpperCase()} UNI-V2 LP` : token.toUpperCase();

  return (
    <Grid container style={{paddingTop: '4px'}}>
      <Grid item xs={12}>
        <div className={classes.detailTitle}>{`Farm / ${pools[index].token}`}</div>
        <div className={classes.detailDesc}>
          {`${t('Farm-Stake')} ${tokenName} ${t('Farm-CAN-GET')} ${earnedToken}，${t('Farm-Time')}${earnTime / 7}周。`}
          <a href={earnedTokenUrl} target="_blank" style={{color: 'rgb(54,85,152)'}}>{t('Farm-Know')}{earnedToken}</a>
        </div>
      </Grid>
      <Grid container item xs={12} style={{marginTop: 30}}>
        <GridItem sm={6}>
          <div className={classNames({
            [classes.menuItem]: true,
            [classes.flexColumnCenter]: true
          })}>
            <div className={classes.menuItemLogo}>
              <Avatar className={classes.menuItemLogoImg}
                      src={require(`../../../images/${earnedToken}-logo.png`)}/></div>
            <div className={classes.menuContent}>
              <div className={classes.menuNumber}>
                <div className={classes.numberWeight}>{Math.floor(myRewardsAvailable.toNumber() * 10000)/ 10000}</div>
                <span>{t('Farm-Earned')} {earnedToken}</span>
              </div>
            </div>
            <Button className={classes.menuItemButton} disabled={!Boolean(claimAble)} onClick={onClaim}>{t('Farm-Reward')}</Button>
          </div>
        </GridItem>
        <GridItem sm={6}>
          <div className={classNames({
            [classes.menuItem]: true,
            [classes.flexColumnCenter]: true
          })}>
            <div className={classes.menuItemLogo}>
              {isLP && lpTokens.length === 2 ?
                lpTokens.map((item, index) => {
                  return (
                    <Avatar key={index} src={require(`../../../images/${item}-logo.png`)}
                            className={classes.menuItemLogoImg}
                            style={index > 0 ? offsetImageStyle : {}}/>
                  )
                }) :
                <Avatar className={classes.menuItemLogoImg} src={require(`../../../images/${name}-logo.png`)}/>}
            </div>
            <Grid container item xs={12} className={classes.menuContent}>
              {
                !isNeedApproval ? (
                  <>
                    <div className={classes.menuNumber}>
                      <div className={classes.numberWeight}>{Math.floor(myBalance.toNumber() * 10000)/ 10000}</div>
                      <span>{t('Farm-Hold')} {tokenName}</span>
                    </div>
                    <div className={classes.menuNumber}>
                      <div className={classes.numberWeight}>{Math.floor(myCurrentlyStaked.toNumber() * 10000)/ 10000}</div>
                      <span>{t('Farm-Pledged')} {tokenName}</span>
                    </div>
                  </>
                ) : (
                  <div className={classes.menuNumber}>
                    <div className={classes.numberWeight}>{Math.floor(myBalance.toNumber() * 10000)/ 10000}</div>
                    <span>{t('Farm-Pledge')} {tokenName} {isLP ? t('Farm-Proof') : ''}</span>
                  </div>
                )
              }
            </Grid>
            {
              !isNeedApproval ?
                <Button className={classes.menuItemButton} onClick={() => {
                  // 显示存入弹窗
                }}>{t('Farm-Stake')} {tokenName}</Button>
                :
                <Button className={classes.menuItemButton} disabled={!Boolean(approvalAble)} onClick={onApproval}>{t('Farm-Approval')} {tokenName}</Button>
            }

            {!isNeedApproval ? <Button className={classNames({
              [classes.menuItemButton]: true,
              [classes.menuItemButtonExit]: true,
            })} disabled={!Boolean(exitAble)} onClick={onExit}>{t('Farm-Exit')}</Button> : null}
          </div>
        </GridItem>
      </Grid>
    </Grid>
  )
}
