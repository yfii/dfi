import React,{ useState, useEffect } from 'react';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import BigNumber from 'bignumber.js'
import moment from 'moment';
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
import Grid from '@material-ui/core/Grid';
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
  // const [ pageSize,setPageSize ] = useState('');
  const [ isNeedApproval, setIsNeedApproval] = useState(true);
  const [ approvalAble, setApprovalAble] = useState(true);
  const [ stakeAble,setStakeAble ] = useState(true);
  const [ withdrawAble,setWithdrawAble ] = useState(true);
  const [ claimAble,setClaimAble ] = useState(true);
  const [ exitAble,setExitAble ] = useState(true);
  const [ myBalance,setMyBalance ] = useState(new BigNumber(balance[index]));
  const [ myCurrentlyStaked, setMyCurrentlyStaked] = useState(new BigNumber(currentlyStaked[index]));
  const [ myRewardsAvailable, setMyRewardsAvailable] = useState(new BigNumber(rewardsAvailable[index]));
  const [ myHalfTime, setMyHalfTime] = useState(`0day 00:00:00`);
  const [ inputVal, setInputVal] = useState(0);
  const [ anchorEl, setAnchorEl] = useState(null);
  const [ canWithdrawTimeIsZero,setCanWithdrawTimeIsZero ] = useState(false);
  const [ canWithdrawTimeIsMoreNowTime,setCanWithdrawTimeIsMoreNowTime ] = useState(false);

  const changeInputVal = (event) => {
    let value = event.target.value;
    const changeIsNumber = /^[0-9]+\.?[0-9]*$/;
    if (!value) return setInputVal(value);
    if (changeIsNumber.test(value)) {
      value = value.replace(/(^[0-9]+)(\.?[0-9]*$)/, (word, p1, p2) => { 
        return Number(p1).toString() + p2;
      });
      if (new BigNumber(Number(value)).comparedTo(showInput === 'stake'?myBalance:myCurrentlyStaked) === 1) return setInputVal((showInput === 'stake'?myBalance.toString():myCurrentlyStaked.toString()));
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
    const func = () => {
      if(Boolean(canWithdrawTime[index] === 0)){
        setCanWithdrawTimeIsZero(true);
        setCanWithdrawTimeIsMoreNowTime(false);
      }else{
        setCanWithdrawTimeIsZero(false);
        if(Boolean((canWithdrawTime[index] * 1000) > new Date().getTime())){
          setCanWithdrawTimeIsMoreNowTime(true);
        }else{
          setCanWithdrawTimeIsMoreNowTime(false);
        }
      }
    }
    const id = setInterval(func, 1000);
    return () => clearInterval(id);
  },[canWithdrawTime[index]])

  const momentFormatTime = (timestamp) =>{
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }

  useEffect(() => {
    const isPending = Boolean(fetchWithdrawPending[index]);
    const currentlyStakedIs0 = currentlyStaked[index] === 0;
    const isPool4 = Boolean(index === 3);
    const isDisableCanWithdrawTime = canWithdrawTimeIsZero || canWithdrawTimeIsMoreNowTime;
    const isPool4AndDisableCanWithDraw = Boolean(isPool4 && isDisableCanWithdrawTime)
    setWithdrawAble(!Boolean(isPending || isPool4AndDisableCanWithDraw || currentlyStakedIs0));
  }, [currentlyStaked[index], fetchWithdrawPending[index], index, canWithdrawTimeIsZero, canWithdrawTimeIsMoreNowTime]);

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
    const isPool4 = Boolean(index === 3);
    const isDisableCanWithdrawTime = canWithdrawTimeIsZero || canWithdrawTimeIsMoreNowTime;
    const isPool4AndDisableCanWithDraw = Boolean(isPool4 && isDisableCanWithdrawTime)
    setExitAble(!Boolean(isPending || isPool4AndDisableCanWithDraw || currentlyStakedAndRewardsAvailableIs0));
  }, [currentlyStaked[index], rewardsAvailable[index], fetchExitPending[index], index, canWithdrawTimeIsZero, canWithdrawTimeIsMoreNowTime]);

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
    if (address) {
      checkApproval(index);
      fetchBalance(index);
      fetchCurrentlyStaked(index);
      fetchRewardsAvailable(index);
      if(Boolean(index === 0) || Boolean(index === 1)) fetchHalfTime(index);
      if(index === 3) fetchCanWithdrawTime(index);
      const id = setInterval(() => {
        checkApproval(index);
        fetchBalance(index);
        fetchCurrentlyStaked(index);
        fetchRewardsAvailable(index);
        if(Boolean(index === 0) || Boolean(index === 1)) fetchHalfTime(index);
        if(index === 3) fetchCanWithdrawTime(index);
      }, 10000);
      return () => clearInterval(id);
    }
  }, [address, index]);

  return (
    <Grid container style={{paddingTop: '4px'}}>
      <Grid item xs={12}>
        <div className={classes.detailTitle}>{`Stake / ${pools[index].name}`}</div>
      </Grid>
      <Grid item xs={12} className={classes.detailContentUp}>
        <GridContainer spacing={3} className={classNames({
          [classes.contentTitle]:true,
          [classes.contentTitleMarginBottom]:true,
        })}>
          <GridItem sm={index===3 ? 4: 3} xs={12} className={classNames({
              [classes.contentTitleItem]:true,
              [classes.contentTitleItemBorder]:true,
            })}>
              <Hidden smUp>
                <Typography variant="body2" gutterBottom className={classes.contentItemTitle}>{t('Stake-Balancer-Your-Balance')}</Typography>
              </Hidden>
              <div className={classes.contentItemTitleVal}>{`${Math.floor(myBalance.toNumber() * 10000)/ 10000} ${pools[index].token}`}</div>
              <Hidden xsDown>
                <div className={classes.contentItemTitle}>{t('Stake-Balancer-Your-Balance')}</div>
              </Hidden>
          </GridItem>
          <GridItem sm={index===3 ? 4: 3} xs={12} className={classNames({
            [classes.contentTitleItem]:true,
            [classes.contentTitleItemBorder]:true,
          })}>
            <Hidden smUp>
              <Typography variant="body2" gutterBottom className={classes.contentItemTitle}>{t('Stake-Balancer-Current-Staked')}</Typography>
            </Hidden>
            <div className={classes.contentItemTitleVal}>{`${Math.floor(myCurrentlyStaked.toNumber() * 10000)/ 10000} ${pools[index].token}`}</div>
            <Hidden xsDown>
              <div className={classes.contentItemTitle}>{t('Stake-Balancer-Current-Staked')}</div>
            </Hidden>
          </GridItem>
          <GridItem sm={index===3 ? 4: 3} xs={12} className={classNames({
            [classes.contentTitleItem]:true,
            [classes.contentTitleItemBorder]:index!==3,
          })}>
            <Hidden smUp>
              <Typography variant="body2" gutterBottom className={classes.contentItemTitle}>{t('Stake-Balancer-Rewards-Available')}</Typography>
            </Hidden>
            <div className={classes.contentItemTitleVal}>{`${Math.floor(myRewardsAvailable.toNumber() * 10000)/ 10000} ${pools[index].earnedToken}`}</div>
            <Hidden xsDown>
              <div className={classes.contentItemTitle}>{t('Stake-Balancer-Rewards-Available')}</div>
            </Hidden>
          </GridItem>
          {index!==3&&<GridItem sm={3} xs={12} className={classes.contentTitleItem}>
          <Hidden smUp>
              <Typography variant="body2" gutterBottom className={classes.contentItemTitle}>{t('Stake-Balancer-Half-Time')}</Typography>
            </Hidden>
            <div className={classes.contentItemTitleVal}>{myHalfTime}</div>
            <Hidden xsDown>
              <div className={classes.contentItemTitle}>{t('Stake-Balancer-Half-Time')}</div>
            </Hidden>
          </GridItem>}
        </GridContainer>
      </Grid>
        <Grid item xs={12} className={classes.detailContentDown}>
          {
            showInput ? (
              <div>
                <GridItem className={classes.inputContainer}>
                  <div className={classes.flexBox}>
                    <div className={classes.inputAvatarContainer}>
                      <Avatar 
                        alt={pools[index].name}
                        src={require(`../../../images/${pools[index].name}-logo.png`)}
                        className={classes.inputAvatar}
                        />
                    </div>
                    <InputBase value={inputVal} style={{fontSize:'20px',lineHeight:'32px'}} onChange={changeInputVal} autoFocus 
                      className={classNames({
                        [classes.inputTxt]:true,
                        [classes.mobileInput]:true,
                      })} />
                    <Hidden xsDown>
                      <div className={classes.inputTxt}>{pools[index].name}</div>
                    </Hidden>
                  </div>
                  <div className={classes.flexBox}>
                    <Hidden xsDown>
                      <div className={classes.inputSubTxt}>{`Balance: ${showInput === 'stake' ? myBalance.toString(): myCurrentlyStaked.toString()}`}</div>
                    </Hidden>
                    <CustomButtons
                      onClick={(event)=>{
                        event.stopPropagation();
                        setInputVal(showInput === 'stake' ? myBalance.toString(): myCurrentlyStaked.toString());
                      }}
                      className={classNames({
                        [classes.stakeButton]:true,
                        [classes.rewardsButton]:true,
                        [classes.mobileMaxButton]:true,
                      })}>
                      {t('Swap-Max')}
                    </CustomButtons>
                    <Hidden smUp>
                      <div style={{height:'38px',lineHeight:'38px',marginLeft:'0',paddingLeft:'8px',borderLeft:'1px solid rgb(255,255,255,0.1)'}} className={classes.inputTxt}>{pools[index].name}</div>
                    </Hidden>
                    <Hidden xsDown>
                      <CustomButtons
                        disabled={!Boolean(showInput === 'stake' ? stakeAble : withdrawAble)}
                        onClick={showInput === 'stake' ? onStake: onWithdraw}
                        className={classes.stakeButton}>
                        {showInput === 'stake' ? t('Stake-Button-Stake'):t('Stake-Button-Unstake-Tokens')}
                      </CustomButtons>
                    </Hidden>
                    <Hidden xsDown>
                      <IconButton
                        className={classes.inputCloseIcon}
                        onClick={(event) => {
                          event.stopPropagation();
                          setShowInput(false);
                        }}
                      >
                        <i className="fa fa-times"/>
                      </IconButton>
                    </Hidden>
                  </div>
                </GridItem>
                <Hidden smUp>
                    <div style={{margin:'10px 0px 24px 45px'}} className={classes.inputSubTxt}>{`Balance: ${showInput === 'stake' ? myBalance.toString(): myCurrentlyStaked.toString()}`}</div>
                    <div className={classes.flexCenter}>
                      <CustomButtons
                            disabled={!Boolean(showInput === 'stake' ? stakeAble : withdrawAble)}
                            style={{width:'300px',height:'44px',marginBottom:'14px',marginRight:'0'}}
                            onClick={showInput === 'stake' ? onStake: onWithdraw}
                            className={classes.stakeButton}>
                            {t('Stake-Button-Stake-Tokens')}
                      </CustomButtons>
                    </div>
                    <div className={classes.flexCenter}>
                      <CustomButtons
                            style={{width:'300px',height:'44px',marginBottom:'14px',marginRight:'0'}}
                            onClick={(event) => {
                              event.stopPropagation();
                              setShowInput(false);
                            }}
                            className={classNames({
                              [classes.stakeButton]:true,
                              [classes.grayButton]:true,
                            })}>
                            {t('Stake-Button-Unstake-Tokens')}
                      </CustomButtons>
                    </div>
                </Hidden>
              </div>
            ) : (
              <GridContainer className={classes.contentTitle}>
                <GridItem md={3} sm={6} xs={12} className={classes.flexCenter} style={{'flexDirection':'column'}}>
                  { isNeedApproval ? (
                    <CustomButtons
                      disabled={!Boolean(approvalAble)}
                      onClick={onApproval}
                      className={classNames({
                        [classes.stakeButton]:true,
                        [classes.stakeDetailButton]:true,
                      })}>
                      {t('Stake-Button-Approval')}
                    </CustomButtons>
                  ): (<CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                      setShowInput('stake');
                    }}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.stakeDetailButton]:true,
                    })}>
                    {t('Stake-Button-Stake-Tokens')}
                  </CustomButtons>
                  )}
                  <div className={classNames({
                    [classes.stakeHintContainer]:true,
                    [classes.stakeHintContainerHidden]:true,
                  })}></div>
                </GridItem>
                <GridItem md={3} sm={6} xs={12} className={classes.flexCenter} style={{'flexDirection':'column'}}>
                  <CustomButtons
                    disabled={!Boolean(withdrawAble)}
                    onClick={(event)=>{
                      event.stopPropagation();
                      setShowInput('unstake');
                    }}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.grayButton]:!Boolean(withdrawAble),
                      [classes.stakeDetailButton]:true,
                    })}>
                    {t('Stake-Button-Unstake-Tokens')}
                  </CustomButtons>
                  {
                    (canWithdrawTimeIsZero || canWithdrawTimeIsMoreNowTime) ? (
                      <div className={classes.stakeHintContainer}>
                        <img src={require(`../../../images/stake-hint.svg`)} style={{marginRight:'3px'}}/>
                        {
                          canWithdrawTimeIsMoreNowTime ? (
                            <span className={classes.stakeHint}>{t('Stake-Pool-Unstake-Hint-Date')+momentFormatTime(canWithdrawTime[index] * 1000)}</span>
                          ) : (
                            <span className={classes.stakeHint}>{t('Stake-Pool-Unstake-Hint')}</span>
                          )
                        }
                      </div>
                    ):(
                      <div className={classNames({
                        [classes.stakeHintContainer]:true,
                        [classes.stakeHintContainerHidden]:true,
                      })}></div>
                    )
                  }
                </GridItem>
                <GridItem md={3} sm={6} xs={12} className={classes.flexCenter} style={{'flexDirection':'column'}}>
                  <CustomButtons
                    disabled={!Boolean(claimAble)}
                    onClick={onClaim}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.rewardsButton]:true,
                      [classes.stakeDetailButton]:true,
                    })}>
                    {t('Stake-Button-Claim-Rewards')}
                  </CustomButtons>
                  <div className={classNames({
                    [classes.stakeHintContainer]:true,
                    [classes.stakeHintContainerHidden]:true,
                  })}></div>
                </GridItem>
                <GridItem md={3} sm={6} xs={12} className={classes.flexCenter} style={{'flexDirection':'column'}}>
                  <CustomButtons
                    disabled={!Boolean(exitAble)}
                    onClick={onExit}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.rewardsButton]:true,
                      [classes.grayButton]:!Boolean(exitAble),
                      [classes.stakeDetailButton]:true,
                    })}>
                    {t('Stake-Button-Exit')}
                  </CustomButtons>
                  {
                    (canWithdrawTimeIsZero || canWithdrawTimeIsMoreNowTime) ? (
                      <div className={classes.stakeHintContainer} >
                        <img src={require(`../../../images/stake-hint.svg`)} style={{marginRight:'3px'}}/>
                        {
                          canWithdrawTimeIsMoreNowTime ? (
                            <span className={classes.stakeHint}>{t('Stake-Pool-Unstake-Hint-Date')+momentFormatTime(canWithdrawTime[index] * 1000)}</span>
                          ) : (
                            <span className={classes.stakeHint}>{t('Stake-Pool-Unstake-Hint')}</span>
                          )
                        }
                      </div>
                    ):(
                      <div className={classNames({
                        [classes.stakeHintContainer]:true,
                        [classes.stakeHintContainerHidden]:true,
                      })}></div>
                    )
                  }
                </GridItem>
              </GridContainer>
            )
          }
        </Grid>
    </Grid>
  )
}
