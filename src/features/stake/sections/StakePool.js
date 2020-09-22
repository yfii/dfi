import React,{ useState, useEffect } from 'react';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js'
import { byDecimals } from 'features/helpers/bignumber';
import { withStyles, makeStyles } from "@material-ui/core/styles";
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
import { isEmpty,inputLimitPass,inputFinalVal } from 'features/helpers/utils';
import {StyledTableCell,StyledTableRow,stakePoolsStyle} from "../jss/sections/stakePoolsStyle";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

import { useConnectWallet } from '../../home/redux/hooks';
import { useCheckApproval, useFetchPoolsInfo, useFetchBalance, useFetchCurrentlyStaked, useFetchRewardsAvailable, useFetchHalfTime, useFetchCanWithdrawTime, useFetchApproval, useFetchStake, useFetchWithdraw, useFetchClaim, useFetchExit } from '../redux/hooks';

const useStyles = makeStyles(stakePoolsStyle);

export default function StakePool(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { address } = useConnectWallet();
  const { allowance, checkApproval } = useCheckApproval();
  const { pools } = useFetchPoolsInfo();
  const { balance, fetchBalance } = useFetchBalance();
  const { currentlyStaked, fetchCurrentlyStaked } = useFetchCurrentlyStaked();
  const { rewardsAvailable, fetchRewardsAvailable } = useFetchRewardsAvailable();
  const { canWithdrawTime, fetchCanWithdrawTime } = useFetchCanWithdrawTime();
  const { halfTime, fetchHalfTime } = useFetchHalfTime();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchStake, fetchStakePending } = useFetchStake();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const { fetchClaim, fetchClaimPending } = useFetchClaim();
  const { fetchExit, fetchExitPending } = useFetchExit();
  const [ index, setIndex] = useState(Number(props.match.params.index) - 1);
  const [ showInput, setShowInput ] = useState(false);
  const [ pageSize,setPageSize ] = useState('');
  const [ isNeedApproval, setIsNeedApproval] = useState(true);
  const [ approvalAble, setApprovalAble] = useState(true);
  const [ stakeAble,setStakeAble ] = useState(true);
  const [ withdrawAble,setWithdraw ] = useState(true);
  const [ claimAble,setClaimAble ] = useState(true);
  const [ exitAble,setExitAble ] = useState(true);
  const [ myBalance,setMyBalance ] = useState(balance[index]);
  const [ myCurrentlyStaked, setMyCurrentlyStaked] = useState(currentlyStaked[index]);
  const [ myRewardsAvailable, setMyRewardsAvailable] = useState(rewardsAvailable[index]);
  const [ myHalfTime, setMyHalfTime] = useState(`0day 00:00:00`);
  const [ inputVal, setInputVal] = useState(0);
  const [ anchorEl, setAnchorEl] = useState(null);

  const changeInputVal = (event) => {
    let value = event.target.value;
    const changeIsNumber = /^[0-9]+\.?[0-9]*$/;
    if (!value) return setInputVal(value);
    if (changeIsNumber.test(value)) {
      value = value.replace(/(^[0-9]+)(\.?[0-9]*$)/, (word, p1, p2) => { 
        return Number(p1).toString() + p2;
      });
      if (Number(value) > (showInput === 'stake'?myBalance:myCurrentlyStaked)) return setInputVal((showInput === 'stake'?myBalance.toString():myCurrentlyStaked.toString()));
      setInputVal(value)
    }
  }

  useEffect(()=>{
    setInputVal(inputFinalVal(String(inputVal),balance[index],pools[index].tokenDecimals));
  },[balance[index], index])

  window.onresize = ()=>{
    let Width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let Height = window.innerHeight || document.documentElement.clientWidth || document.body.clientHeight;
    let nowPageSize = '';
    if(Width >= 960){
      nowPageSize = 'exceedSm';
    }else if(Width >= 600){
      nowPageSize = 'sm';
    }else{
      nowPageSize = 'xs';
    }
    if(nowPageSize != pageSize){
      setPageSize(nowPageSize);
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
    const isPool4 = Boolean(index === 3);
    const isDisableCanWithdrawTime = Boolean(canWithdrawTime[index] === 0) || Boolean((canWithdrawTime[index] * 1000) > new Date().getTime());
    const isPool4AndDisableCanWithDraw = Boolean(isPool4 && isDisableCanWithdrawTime)
    setWithdraw(!Boolean(isPending || isPool4AndDisableCanWithDraw || currentlyStakedIs0));
  }, [fetchWithdrawPending[index], index, new Date()]);

  const onWithdraw = () => {
    const amount = new BigNumber(inputVal).multipliedBy(new BigNumber(10).exponentiatedBy(pools[index].tokenDecimals)).toString(10);
    fetchWithdraw(index, amount);
  }

  useEffect(() => {
    const isPending = Boolean(fetchClaimPending[index]);
    const rewardsAvailableIs0 = rewardsAvailable[index] === 0;
    setClaimAble(!Boolean(isPending || rewardsAvailableIs0));
  }, [fetchClaimPending[index], index]);

  const onClaim = () => {
    fetchClaim(index);
  }

  useEffect(() => {
    const isPending = Boolean(fetchExitPending[index]);
    const currentlyStakedIs0 = currentlyStaked[index] === 0;
    const rewardsAvailableIs0 = rewardsAvailable[index] === 0;
    const currentlyStakedAndRewardsAvailableIs0 = Boolean(currentlyStakedIs0 && currentlyStakedIs0);
    const isPool4 = Boolean(index === 3);
    const isDisableCanWithdrawTime = Boolean(canWithdrawTime[index] === 0) || Boolean((canWithdrawTime[index] * 1000) > new Date().getTime());
    const isPool4AndDisableCanWithDraw = Boolean(isPool4 && isDisableCanWithdrawTime)
    setExitAble(!Boolean(isPending || isPool4AndDisableCanWithDraw || currentlyStakedAndRewardsAvailableIs0));
  }, [fetchExitPending[index], index, new Date()]);

  const onExit = () => {
    fetchExit(index);
  }

  useEffect(() => {
    const amount = byDecimals(balance[index], pools[index].tokenDecimals).toNumber();
    setMyBalance(amount);
  }, [balance[index], pools, index]);

  useEffect(() => {
    const amount = byDecimals(currentlyStaked[index], pools[index].tokenDecimals).toNumber();
    setMyCurrentlyStaked(amount);
  }, [currentlyStaked[index], pools, index]);

  useEffect(() => {
    const amount = byDecimals(rewardsAvailable[index], pools[index].earnedTokenDecimals).toNumber();
    setMyRewardsAvailable(amount);
  }, [rewardsAvailable[index], pools, index]);

  useEffect(() => {
    if(halfTime[index] === 0) return;
    if(Boolean(index === 2) || Boolean(index=== 3)) return;
    const formatTime = () => {
      const currTime = new Date().getTime();
      const deadline = halfTime[index] * 1000;
      const time = deadline - currTime;
      if (time <= 0) { return fetchHalfTime(index);}
      const day = Math.floor(time / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      const hours = Math.floor(( time / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      const minutes = Math.floor(( time / (1000 * 60)) % 60).toString().padStart(2, '0');
      const seconds = Math.floor(( time / 1000) % 60).toString().padStart(2, '0');
      setMyHalfTime(`${day}day ${hours}:${minutes}:${seconds}`);
    }
    formatTime();
    const id = setInterval(formatTime, 1000);
    return () => clearInterval(id);
  }, [halfTime[index], pools, index]);

  useEffect(() => {
    if(!address) return;
    checkApproval(index);
    fetchBalance(index);
    fetchCurrentlyStaked(index);
    fetchRewardsAvailable(index);
    if(Boolean(index === 0) || Boolean(index === 1)) fetchHalfTime(index);
    if(index === 3) fetchCanWithdrawTime(index);
  }, [address, index]);

  return (
    <GridContainer>
      <div className={classes.detailContainer}>
        <div className={classes.detailTitle}>{`Stake / ${pools[index].name}`}</div>
        <div className={classes.detailContent}>
          <GridContainer className={classNames({
            [classes.contentTitle]:true,
            [classes.marginBottom]:true,
          })}>
            <GridItem md={index===3 ? 4: 3} xs={index===3 ? 4 : 6} className={classNames({
                [classes.contentTitleItem]:true,
                [classes.contentTitleItemBorder]:true,
              })}>
                <div>{`${Math.floor(myBalance * 10000)/ 10000} ${pools[index].token}`}</div>
                <div>{t('Stake-Balancer-Your-Balance')}</div>
            </GridItem>

            <GridItem md={index===3 ? 4: 3} xs={index===3 ? 4 : 6} className={classNames({
              [classes.contentTitleItem]:true,
              [classes.contentTitleItemBorder]:pageSize=='exceedSm' ? true : false,
            })}>
              <div>{`${Math.floor(myCurrentlyStaked * 10000)/ 10000} ${pools[index].token}`}</div>
              <div>{t('Stake-Balancer-Current-Staked')}</div>
            </GridItem>
            <GridItem md={index===3 ? 4: 3} xs={index===3 ? 4 : 6} className={classNames({
              [classes.contentTitleItem]:true,
              [classes.contentTitleItemBorder]:true,
            })}>
              <div>{`${Math.floor(myRewardsAvailable * 10000)/ 10000} ${pools[index].earnedToken}`}</div>
              <div>{t('Stake-Balancer-Rewards-Available')}</div>
            </GridItem>
            {index!==3&&<GridItem md={3} xs={6} className={classes.contentTitleItem}>
              <div>{myHalfTime}</div>
              <div>{t('Stake-Balancer-Half-Time')}</div>
            </GridItem>}
          </GridContainer>
          {
            showInput ? (
              <GridItem className={classes.inputContainer}>
                <div className={classes.flexBox}>
                  <div className={classes.inputAvatarContainer}>
                    <Avatar 
                      alt={pools[index].name}
                      src={require(`../../../images/${pools[index].name}-logo.png`)}
                      className={classNames({
                        [classes.avatar]:true,
                      })}
                      />
                  </div>
                  <InputBase value={inputVal} onChange={changeInputVal} autoFocus className={classes.inputTxt} />
                  <div className={classes.inputTxt}>{pools[index].name}</div>
                </div>
                <div className={classes.flexBox}>
                  <div className={classes.inputSubTxt}>{`Balance: ${showInput === 'stake' ? myBalance: myCurrentlyStaked}`}</div>
                  <CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                      setInputVal(showInput === 'stake' ? myBalance.toString(): myCurrentlyStaked.toString());
                    }}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.rewardsButton]:true,
                    })}>
                    {t('Swap-Max')}
                  </CustomButtons>
                  <CustomButtons
                    disabled={!Boolean(showInput === 'stake' ? stakeAble : withdrawAble)}
                    onClick={showInput === 'stake' ? onStake: onWithdraw}
                    className={classes.stakeButton}>
                    {showInput === 'stake' ? t('Stake-Button-Stake'):t('Stake-Button-Unstake-Tokens')}
                  </CustomButtons>
                  <IconButton
                    className={classes.inputCloseIcon}
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowInput(false);
                    }}
                  >
                    <i className="fa fa-times"/>
                  </IconButton>
                </div>
              </GridItem>
            ) : (
              <GridContainer className={classes.contentTitle}>
                <GridItem md={3} xs={6} className={classes.flexCenter}>
                  { isNeedApproval ? (
                    <CustomButtons
                      disabled={!Boolean(approvalAble)}
                      onClick={onApproval}
                      className={classes.stakeButton}>
                      {t('Stake-Button-Approval')}
                    </CustomButtons>
                  ): (<CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                      setShowInput('stake');
                    }}
                    className={classes.stakeButton}>
                    {t('Stake-Button-Stake-Tokens')}
                  </CustomButtons>
                  )}
                </GridItem>
                <GridItem md={3} xs={6} className={classes.flexCenter}>
                  <CustomButtons
                    disabled={!Boolean(withdrawAble)}
                    onClick={(event)=>{
                      event.stopPropagation();
                      setShowInput('unstake');
                    }}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.grayButton]:true,
                    })}>
                    {t('Stake-Button-Unstake-Tokens')}
                  </CustomButtons>
                </GridItem>
                <GridItem md={3} xs={6} className={classes.flexCenter}>
                  <CustomButtons
                    disabled={!Boolean(claimAble)}
                    onClick={onClaim}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.rewardsButton]:true,
                    })}>
                    {t('Stake-Button-Claim-Rewards')}
                  </CustomButtons>
                </GridItem>
                <GridItem md={3} xs={6} className={classes.flexCenter}>
                  <CustomButtons
                    disabled={!Boolean(exitAble)}
                    onClick={onExit}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.grayButton]:true,
                    })}>
                    {t('Stake-Button-Exit')}
                  </CustomButtons>
                </GridItem>
              </GridContainer>
            )
          }
        </div>
      </div>
    </GridContainer>
  )
}
