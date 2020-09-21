import React,{ useState, useEffect } from 'react';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CustomButtons from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import { isEmpty } from 'features/helpers/utils';
import {StyledTableCell,StyledTableRow,stakePoolsStyle} from "../jss/sections/stakePoolsStyle";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

import { useConnectWallet } from '../../home/redux/hooks';
import { useCheckApproval, useFetchPoolsInfo, useFetchBalance, useFetchCurrentlyStaked, useFetchRewardsAvailable, useFetchHalfTime, useFetchCanWithdrawTime, useFetchApproval, useFetchStake, useFetchDeposit, useFetchClaim, useFetchExit } from '../redux/hooks';

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
  const { fetchDeposit, fetchDepositPending } = useFetchDeposit();
  const { fetchClaim, fetchClaimPending } = useFetchClaim();
  const { fetchExit, fetchExitPending } = useFetchExit();
  const [ index, setIndex ] = useState(Number(props.match.params.index));
  const [ showInput, setShowInput ] = useState(false);
  const [ pageSize,setPageSize ] = useState('');
  const [ isNeedApproval, setIsNeedApproval] = useState(true);
  const [ approvalAble, setApprovalAble] = useState(true);
  const [ stakeAble,setStakeAble ] = useState(true);
  const [ depositAble,setDepositAble ] = useState(true);
  const [ claimAble,setClaimAble ] = useState(true);
  const [ exitAble,setExitAble ] = useState(true);
  console.warn('~~~document.body.clientWidth~~',document.body.clientWidth);
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
    setIndex(props.match.params.index);
  }, [Number(props.match.params.index)]);

  useEffect(() => {
    setIsNeedApproval(Boolean(allowance[index] === 0));
  }, [allowance, index]);

  useEffect(() => {
    setApprovalAble(!Boolean(fetchApprovalPending[index]));
  }, [fetchApprovalPending, index]);

  useEffect(() => {
    setStakeAble(!Boolean(fetchStakePending[index]));
  }, [fetchStakePending, index]);

  useEffect(() => {
    setDepositAble(!Boolean(fetchDepositPending[index]));
  }, [fetchDepositPending, index]);

  useEffect(() => {
    setClaimAble(!Boolean(fetchClaimPending[index]));
  }, [fetchClaimPending, index]);

  useEffect(() => {
    setExitAble(!Boolean(fetchExitPending[index]));
  }, [fetchExitPending, index]);

  useEffect(() => {
    if(!address) return;
    checkApproval(index);
    fetchBalance(index);
    fetchCurrentlyStaked(index);
    fetchRewardsAvailable(index);
    if(index === 3) fetchCanWithdrawTime(index);
  }, [address, index]);

  useEffect(() => {
    if(index=== 0 || index === 1) fetchHalfTime(index);
  }, [index]);
  
  return (
    <GridContainer>
      
      <div className={classes.detailContainer}>
        <div className={classes.detailTitle}>{`Stake / ${pools[index].name}`}</div>
        <div className={classes.detailContent}>
          <GridContainer className={classNames({
            [classes.contentTitle]:true,
            [classes.marginBottom]:true,
          })}>
            <GridItem md={3} xs={6} className={classNames({
                [classes.contentTitleItem]:true,
                [classes.contentTitleItemBorder]:true,
              })}>
                <div>2345.6672 BPT</div>
                <div>{t('Stake-Balancer-Your-Balance')}</div>
            </GridItem>

            <GridItem md={3} xs={6} className={classNames({
              [classes.contentTitleItem]:true,
              [classes.contentTitleItemBorder]:pageSize=='exceedSm' ? true : false,
            })}>
              <div>2345.6672 BPT</div>
              <div>{t('Stake-Balancer-Current-Staked')}</div>
            </GridItem>
            <GridItem md={3} xs={6} className={classNames({
              [classes.contentTitleItem]:true,
              [classes.contentTitleItemBorder]:true,
            })}>
              <div>234.0256 YFII</div>
              <div>{t('Stake-Balancer-Rewards-Available')}</div>
            </GridItem>
            <GridItem md={3} xs={6} className={classes.contentTitleItem}>
              <div>01day 03:17:10</div>
              <div>{t('Stake-Balancer-Half-Time')}</div>
            </GridItem>
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
                  <InputBase autoFocus className={classes.inputTxt}/>
                  <div className={classes.inputTxt}>{pools[index].name}</div>
                </div>
                <div className={classes.flexBox}>
                  <div className={classes.inputSubTxt}>Balance: 8888.0000</div>
                  <CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                    }}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.rewardsButton]:true,
                    })}>
                    {t('Swap-Max')}
                  </CustomButtons>
                  <CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                    }}
                    className={classes.stakeButton}>
                    {t('Stake-Button-Stake')}
                  </CustomButtons>
                  <IconButton
                    className={classes.inputCloseIcon}
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowInput(false);
                    }}
                  >
                    <i class="fa fa-times"/>
                  </IconButton>
                </div>
              </GridItem>
            ) : (
              <GridContainer className={classes.contentTitle}>
                <GridContainer md={3} xs={6} justify={pageSize!='exceedSm'?'center':'flex-start'}>
                  <CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                      setShowInput(true);
                    }}
                    className={classes.stakeButton}>
                    {t('Stake-Button-Stake-Tokens')}
                  </CustomButtons>
                </GridContainer>
                <GridContainer md={3} xs={6} justify={pageSize!='exceedSm'?'center':'flex-start'}>
                  <CustomButtons
                    disabled={!Boolean(claimAble)}
                    onClick={()=>fetchClaim(index)}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.rewardsButton]:true,
                    })}>
                    {t('Stake-Button-Claim-Rewards')}
                  </CustomButtons>
                </GridContainer>
                <GridContainer md={3} xs={6} justify={pageSize!='exceedSm'?'center':'flex-start'}>
                  <CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                    }}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.grayButton]:true,
                    })}>
                    {t('Stake-Button-Unstake-Tokens')}
                  </CustomButtons>
                </GridContainer>
                <GridContainer md={3} xs={6} justify={pageSize!='exceedSm'?'center':'flex-start'}>
                  <CustomButtons
                    onClick={(event)=>{
                      event.stopPropagation();
                    }}
                    className={classNames({
                      [classes.stakeButton]:true,
                      [classes.grayButton]:true,
                    })}>
                    {t('Stake-Button-Exit')}
                  </CustomButtons>
                </GridContainer>
              </GridContainer>
            )
          }
          
        </div>
      </div>
    </GridContainer>
  )
}
