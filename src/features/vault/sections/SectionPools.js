/* eslint-disable */
import React, { useState, useEffect, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from "bignumber.js";
import {byDecimals,calculateReallyNum} from 'features/helpers/bignumber';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion'
import classNames from "classnames";
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionActions'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {primaryColor} from "assets/jss/material-kit-pro-react.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import CustomInput from "components/CustomInput/CustomInput.js";
// sections for this section
// import SectionOpenedPool from "./SectionOpenedPool";
import { useSnackbar } from 'notistack';
//  hooks
import { useConnectWallet } from '../../home/redux/hooks';
import { useFetchBalances, useFetchPoolBalances, useFetchApproval, useFetchDeposit, useFetchWithdraw, useFetchContractApy } from '../redux/hooks';
import CustomSlider from 'components/CustomSlider/CustomSlider';

import sectionPoolsStyle from "../jss/sections/sectionPoolsStyle";
import { reflect } from 'async';
import { inputLimitPass,inputFinalVal,isEmpty } from 'features/helpers/utils';

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionPools() {
  const { t, i18n } = useTranslation();
  const { web3, address, networkId } = useConnectWallet();
  let { pools, fetchPoolBalances } = useFetchPoolBalances();
  const { tokens, fetchBalances } = useFetchBalances();
  const [ openedCardList, setOpenCardList ] = useState([0]);
  const classes = useStyles();

  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositEth, fetchDepositPending } = useFetchDeposit();
  const { fetchWithdraw, fetchWithdrawEth, fetchWithdrawPending } = useFetchWithdraw();
  const { contractApy, fetchContractApy } = useFetchContractApy();

  const [ depositedBalance, setDepositedBalance ] = useState({});
  const [ withdrawAmount, setWithdrawAmount ] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const changeDetailInputValue = (type,index,total,tokenDecimals,event) => {
    let value = event.target.value;
    if(!inputLimitPass(value,tokenDecimals)){
      return;
    }
    let sliderNum = 0;
    let inputVal = Number(value.replace(',',''));
    if(value){
        sliderNum = byDecimals(inputVal/total,0).toFormat(2) * 100;
    }
    switch(type){
        case 'depositedBalance':
            setDepositedBalance({
                ...depositedBalance,
                [index]: inputFinalVal(value,total,tokenDecimals),
                [`slider-${index}`]: sliderNum,
            });
            break;
        case 'withdrawAmount':
            setWithdrawAmount({
                ...withdrawAmount,
                [index]: inputFinalVal(value,total,tokenDecimals),
                [`slider-${index}`]: sliderNum,
            });
            break;
        default:
            break;
    }
  }

  const handleDepositedBalance = (index,total,event,sliderNum) => {
    setDepositedBalance({
      ...depositedBalance,
      [index]: sliderNum == 0 ? '0': calculateReallyNum(total,sliderNum),
      [`slider-${index}`]: sliderNum == 0 ? 0: sliderNum,
    });
  }

  const handleWithdrawAmount = (index,total,event,sliderNum) => {
    setWithdrawAmount({
      ...withdrawAmount,
      [index]: sliderNum == 0 ? '0': calculateReallyNum(total,sliderNum),
      [`slider-${index}`]: sliderNum == 0 ? 0: sliderNum,
    });
  };

  const onApproval = (pool, index, event) => {
    event.stopPropagation();
    fetchApproval({
      address,
      web3,
      tokenAddress: pool.tokenAddress,
      contractAddress: pool.earnContractAddress,
      index
    }).then(
      () => enqueueSnackbar(`Approval success`, {variant: 'success'})
    ).catch(
      error => enqueueSnackbar(`Approval error: ${error}`, {variant: 'error'})
    )
  }

  const onDeposit = (pool, index, isAll, balanceSingle, event) => {
    event.stopPropagation();
    if (isAll) {
      setDepositedBalance({
        ...depositedBalance,
        [index]: String(forMat(balanceSingle)),
        [`slider-${index}`]: 100,
      })
    }
    let amountValue =  depositedBalance[index]? depositedBalance[index].replace(',',''): depositedBalance[index];
    if(amountValue == undefined){
      amountValue = '0';
    }
    if (!pool.tokenAddress) {// 如果是eth
      fetchDepositEth({
        address,
        web3,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index
      }).then(
        () => enqueueSnackbar(`Deposit success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Deposit error: ${error}`, {variant: 'error'})
      )
    } else {
      fetchDeposit({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index
      }).then(
        () => enqueueSnackbar(`Deposit success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Deposit error: ${error}`, {variant: 'error'})
      )
    }
  }

  const onWithdraw = (pool, index, isAll, singleDepositedBalance, event) => {
    event.stopPropagation();
    if (isAll) {
      setWithdrawAmount({
        ...withdrawAmount,
        [index]: String(forMat(singleDepositedBalance)),
        [`slider-${index}`]: 100,
      })
    }
    let amountValue =  withdrawAmount[index]? withdrawAmount[index].replace(',',''): withdrawAmount[index];
    if(amountValue == undefined){
      amountValue = '0';
    }
    if (!pool.tokenAddress) {// 如果是eth
      fetchWithdrawEth({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.itokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index
      }).then(
        () => enqueueSnackbar(`Withdraw success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Withdraw error: ${error}`, {variant: 'error'})
      )
    } else {
      fetchWithdraw({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.itokenDecimals)).toString(10),
        contractAddress: pool.earnContractAddress,
        index
      }).then(
        () => enqueueSnackbar(`Withdraw success`, {variant: 'success'})
      ).catch(
        error => enqueueSnackbar(`Withdraw error: ${error}`, {variant: 'error'})
      )
    }
    
  }

  const openCard = id => {
    return setOpenCardList(
      openedCardList => {
        if(openedCardList.includes(id)) {
          return openedCardList.filter(item => item!==id)
        } else {
          return [...openedCardList, id]
        }
      }
    )
  } 

  useEffect(() => {
    if (address && web3) {
      fetchBalances({address, web3, tokens});
      fetchPoolBalances({address, web3, pools});
      const id = setInterval(() => {
        fetchBalances({address, web3, tokens});
        fetchPoolBalances({address, web3, pools});
      }, 10000);
      return () => clearInterval(id);
    }
  }, [address, web3, fetchBalances, fetchPoolBalances]);

  const isMoreDepostLimit = (value,depostLimit) => {
    if(isEmpty(value) ||  depostLimit==0 || value < depostLimit){
      return false
    }
    return true;
  }

  useEffect(() => {
    fetchContractApy();
  }, [pools, fetchContractApy]);

  const forMat = number => {
    return new BigNumber(
      number
    ).multipliedBy(
      new BigNumber(10000)
    ).dividedToIntegerBy(
      new BigNumber(1)
    ).dividedBy(
      new BigNumber(10000)
    ).toNumber()
  }

  const isZh = Boolean((i18n.language == 'zh') || (i18n.language == 'zh-CN'));
  const gridItemStyle = {
    display: "flex",
    justifyContent : "space-around",
    alignItems : "center",
    alignContent: "space-around",
  }

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return (
    <Grid container style={{paddingTop: '4px'}}>
      <Grid item xs={12}>
        <div className={classes.mainTitle}>{t('Vault-Main-Title')}</div>
        <h3 className={classes.secondTitle}>{t('Vault-Second-Title')}</h3>
      </Grid>
      
        {Boolean(networkId === Number(process.env.NETWORK_ID)) && pools.map((pool, index) => {
            let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
            // balanceSingle = byDecimals(random(1, 1000000), 1)
            // balanceSingle = new BigNumber(random(1, 1000000000000000))
            let singleDepositedBalance = byDecimals(tokens[pool.earnedToken].tokenBalance, pool.itokenDecimals);
            // singleDepositedBalance = byDecimals(random(1, 1000000), 1)
            // singleDepositedBalance = new BigNumber(random(1, 1000))
            let depositedApy = contractApy[pool.id] || 0;
            // depositedApy = random(0, 1)
            // depositedApy =byDecimals(random(0, 100), 1)
            return (
                <Grid item xs={12} container key={index} style={{marginBottom: "24px"}} spacing={0}>
                    <div style={{width: "100%"}}>
                        <Accordion
                            expanded={Boolean(openedCardList.includes(index))}
                            className={classes.accordion}
                            TransitionProps={{ unmountOnExit: true }}
                        >
                        <AccordionSummary
                            className={classes.details}
                            style={{ justifyContent: "space-between"}}
                            onClick={(event) => {
                                event.stopPropagation();
                                openCard(index)
                            }}
                        >
                        <Grid container alignItems="center" justify="space-around" spacing={4} style={{paddingTop: "16px", paddingBottom: "16px"}}>
                            <Grid item>
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item>
                                        <Avatar 
                                            alt={pool.token}
                                            src={require(`../../../images/${pool.token}-logo.png`)}
                                        />
                                    </Grid>
                                    <Grid item style={{minWidth: '100px'}}>
                                            <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom>
                                                {pool.token}
                                                <Hidden smUp>
                                                    <i
                                                        style={{color:primaryColor[0],marginLeft:'4px',visibility:Boolean(isZh?pool.tokenDescriptionUrl2:pool.tokenDescriptionUrl)?"visible":"hidden"}}
                                                        className={"yfiiicon yfii-help-circle"} 
                                                        onClick={
                                                            event => {
                                                                event.stopPropagation();
                                                                window.open(isZh?pool.tokenDescriptionUrl2:pool.tokenDescriptionUrl)
                                                            }
                                                        }
                                                        />
                                                </Hidden>
                                            </Typography>
                                            
                                        <Typography className={classes.iconContainerSubTitle} variant="body2">{pool.token}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item md={8} xs={3}>
                                <Grid item container justify="space-between">
                                    <Hidden smDown>
                                        <Grid item xs={7} container justify='center' alignItems="center">
                                            <Grid item style={{width: "200px"}}>
                                                <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap>{forMat(balanceSingle)} { pool.token }</Typography>
                                                <Typography className={classes.iconContainerSubTitle} variant="body2">{t('Vault-Balance')}</Typography></Grid>
                                        </Grid>
                                    </Hidden>
                                    <Hidden mdDown>
                                        <Grid item xs={4} container justify='center' alignItems="center">
                                            <Grid item style={{width: "200px"}}>
                                                <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap>{forMat(singleDepositedBalance)} { pool.earnedToken }</Typography>
                                                <Typography className={classes.iconContainerSubTitle} variant="body2">{t('Vault-Deposited')}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Hidden>
                                    <Grid item xs={12} md={1} container justify='center' alignItems="center">
                                        <Grid item>
                                            <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap> {depositedApy}</Typography>
                                            <Typography className={classes.iconContainerSubTitle} variant="body2">{t('Vault-ListAPY')}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item >
                                <Grid item container justify="flex-end" alignItems="center" spacing={2}>
                                    <Hidden mdDown>
                                        <Grid item>
                                        <IconButton
                                            classes={{
                                                root:classes.iconContainerSecond
                                            }}
                                            style={{visibility:Boolean(isZh?pool.tokenDescriptionUrl2:pool.tokenDescriptionUrl)?"visible":"hidden"}}
                                            // className={classes.iconContainerSecond}
                                            onClick={
                                                event => {
                                                    event.stopPropagation();
                                                    window.open(isZh?pool.tokenDescriptionUrl2:pool.tokenDescriptionUrl)
                                                }
                                            }
                                        >
                                            <i className={"yfiiicon yfii-help-circle"} />
                                        </IconButton>
                                        </Grid>
                                    </Hidden>
                                    <Grid item>
                                    <IconButton
                                        className={classes.iconContainerPrimary}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            openCard(index);  
                                        }}
                                    >
                                        {
                                            openedCardList.includes(index) ? <i className={"yfiiicon yfii-arrow-up"} /> : <i className={"yfiiicon yfii-arrow-down"} />
                                        }
                                    </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                      </Grid>
              </AccordionSummary>
              <AccordionDetails style={{ justifyContent: "space-between"}}>
                <Grid container style={{width: "100%", marginLeft: 0, marginRight: 0}}>
                  <Grid item xs={12} sm={6} className={classes.sliderDetailContainer}>
                    <div className={classes.showDetailRight}>
                          {t('Vault-Balance')}:{balanceSingle.toFormat(4)} { pool.token }
                    </div>
                    <FormControl fullWidth variant="outlined">
                        <CustomOutlinedInput 
                            value={depositedBalance[index]!=undefined ? depositedBalance[index] :'0'}
                            onChange={changeDetailInputValue.bind(this,'depositedBalance',index,balanceSingle.toNumber(),pool.tokenDecimals)}
                            />
                    </FormControl>
                    <CustomSlider 
                      classes={{
                        root: classes.depositedBalanceSliderRoot,
                        markLabel: classes.depositedBalanceSliderMarkLabel,
                      }}
                      aria-labelledby="continuous-slider" 
                      value={depositedBalance['slider-'+index]?depositedBalance['slider-'+index]:0}
                      onChange={handleDepositedBalance.bind(this,index,balanceSingle.toNumber())}
                    />
                    
                        <div>
                            {
                                pool.allowance === 0 ? (
                                    <div className={classes.showDetailButtonCon}>
                                        <Button 
                                            style={{
                                                backgroundColor:'#353848',
                                                color:'#FF2D82',
                                                boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)',
                                                fontWeight: "bold"
                                            }}
                                            color="primary"
                                            onClick={onApproval.bind(this, pool, index)}
                                            disabled={fetchApprovalPending[index] }
                                            >
                                            {fetchApprovalPending[index] ? `${t('Vault-ApproveING')}` : `${t('Vault-ApproveButton')}`}
                                        </Button>
                                    </div>
                                ) : (
                                    <div className={classes.showDetailButtonCon}>
                                        <Button 
                                            style={{
                                                width: '180px',
                                                margin: '12px 5px',
                                                fontSize: '14px',
                                                fontWeight:'bold',
                                                backgroundColor:'#353848',
                                                color:'#FF2D82',
                                                boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)'
                                            }}
                                            round
                                            onFocus={(event) => event.stopPropagation()}
                                            disabled={
                                                fetchDepositPending[index] || (new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber() || isMoreDepostLimit(new BigNumber(depositedBalance[index]).toNumber(),pool.depostLimit) )
                                            }
                                            onClick={onDeposit.bind(this, pool, index, false, balanceSingle)}
                                            >{t('Vault-DepositButton')}
                                        </Button>
                                        {Boolean(pool.tokenAddress) && <Button 
                                            style={{
                                                width: '180px',
                                                margin: '12px 5px',
                                                fontSize: '14px',
                                                fontWeight:'bold',
                                                backgroundColor:'#353848',
                                                color:'#FF2D82',
                                                boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)'
                                            }}
                                            round
                                            onFocus={(event) => event.stopPropagation()}
                                            disabled={
                                                fetchDepositPending[index] || (new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber() || isMoreDepostLimit(balanceSingle.toNumber(),pool.depostLimit) )
                                            }
                                            onClick={onDeposit.bind(this, pool, index, true, balanceSingle)}
                                            >{t('Vault-DepositButtonAll')}
                                        </Button>}
                                    </div>
                                )
                            }
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6} className={classes.sliderDetailContainer}>
                        <div className={classes.showDetailRight}>
                                {singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)).toFormat(4)} { pool.token } ({singleDepositedBalance.toFormat(4)} { pool.earnedToken })
                            </div>
                        <FormControl fullWidth variant="outlined">
                            <CustomOutlinedInput 
                                value={withdrawAmount[index]!=undefined ? withdrawAmount[index] : '0'}
                                onChange={changeDetailInputValue.bind(this,'withdrawAmount',index,singleDepositedBalance.toNumber(),pool.itokenDecimals)}
                                />
                        </FormControl>
                        <CustomSlider 
                            classes={{
                                root: classes.drawSliderRoot,
                                markLabel: classes.drawSliderMarkLabel,
                            }}
                            aria-labelledby="continuous-slider" 
                            value={withdrawAmount['slider-'+index]?withdrawAmount['slider-'+index]:0}
                            onChange={handleWithdrawAmount.bind(this,index,singleDepositedBalance.toNumber())}
                            />
                        <div className={classes.showDetailButtonCon}>
                            <Button 
                                style={{
                                    width: '180px',
                                    margin: '12px 5px',
                                    fontSize: '14px',
                                    fontWeight:'bold',
                                    backgroundColor:'#353848',
                                    color:'#635AFF',
                                    boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)'
                                }}
                                round
                                type="button"
                                color="primary"
                                disabled={fetchWithdrawPending[index]}
                                onClick={onWithdraw.bind(this, pool, index, false, singleDepositedBalance)}
                                >
                                {fetchWithdrawPending[index] ? `${t('Vault-WithdrawING')}`: `${t('Vault-WithdrawButton')}`}
                            </Button>
                            <Button 
                                style={{
                                    width: '180px',
                                    margin: '12px 5px',
                                    fontSize: '14px',
                                    fontWeight:'bold',
                                    backgroundColor:'#353848',
                                    color:'#635AFF',
                                    boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)',
                                }}
                                round
                                type="button"
                                color="primary"
                                onClick={onWithdraw.bind(this, pool, index, true, singleDepositedBalance)}
                                >
                                {fetchWithdrawPending[index] ? `${t('Vault-WithdrawING')}`: `${t('Vault-WithdrawButtonAll')}`}
                            </Button>
                        </div>
                    </Grid>

                  </Grid>
              </AccordionDetails>
            </Accordion>
            </div>
            </Grid>
          )
        })}
      
    </Grid>
  )
}
