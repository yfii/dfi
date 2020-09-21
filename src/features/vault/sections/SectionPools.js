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
import FormControl from '@material-ui/core/FormControl';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
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
    let reg = /[a-z]/i;
    let valueArr = value.split('.');
    if(reg.test(value) || (valueArr.length==2 && valueArr[1].length > tokenDecimals) ){
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
                [index]: inputVal > total ? byDecimals(total,0).toFormat(tokenDecimals) :value,
                [`slider-${index}`]: sliderNum,
            });
            break;
        case 'withdrawAmount':
            setWithdrawAmount({
                ...withdrawAmount,
                [index]: inputVal > total ? byDecimals(total,0).toFormat(tokenDecimals) :value,
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
      [index]: sliderNum == 0 ? 0: calculateReallyNum(total,sliderNum),
      [`slider-${index}`]: sliderNum == 0 ? 0: sliderNum,
    });
  }

  const handleWithdrawAmount = (index,total,event,sliderNum) => {
    setWithdrawAmount({
      ...withdrawAmount,
      [index]: sliderNum == 0 ? 0: calculateReallyNum(total,sliderNum),
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
        [index]: forMat(balanceSingle),
        [`slider-${index}`]: 100,
      })
    }
    let amountValue =  depositedBalance[index]? depositedBalance[index].replace(',',''): depositedBalance[index];
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
    // console.log(isAll)
    if (isAll) {
      setWithdrawAmount({
        ...withdrawAmount,
        [index]: forMat(singleDepositedBalance),
        [`slider-${index}`]: 100,
      })
    }
    let amountValue =  withdrawAmount[index]? withdrawAmount[index].replace(',',''): withdrawAmount[index];
    if (!pool.tokenAddress) {// 如果是eth
      fetchWithdrawEth({
        address,
        web3,
        isAll,
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
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
        amount: new BigNumber(amountValue).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
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

  return (
    <GridContainer justify="center">
      <GridItem>
        <div className={classes.mainTitle}>{t('Vault-Main-Title')}</div>
        <h3 className={classes.secondTitle}>{t('Vault-Second-Title')}</h3>
      </GridItem>
      <GridItem md={12} xs={12} sm={10}>
        {Boolean(networkId === Number(process.env.NETWORK_ID)) && pools.map((pool, index) => {
          let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
          let singleDepositedBalance = byDecimals(tokens[pool.earnedToken].tokenBalance, pool.tokenDecimals);
          let depositedApy = contractApy[pool.id] || 0;
          return (
            <Accordion
              key={index}
              expanded={Boolean(openedCardList.includes(index))}
              className={classes.accordionMargin}
            >
              <AccordionSummary
                className={classes.details}
                style={{ justifyContent: "space-between"}}
                onClick={(event) => {
                    event.stopPropagation();
                    openCard(index)
                }}
              >
                  <GridContainer style={{width: "100%", marginLeft: 0, marginRight: 0}}>
                      <GridItem xs={4} sm={2} style={Object.assign({},{},gridItemStyle,{justifyContent:'flex-start'})}>
                          <GridItem xs={6}>
                              <Avatar 
                              alt={pool.token}
                              src={require(`../../../images/${pool.token}-logo.png`)}
                              style={{}}
                              />
                          </GridItem>
                          <GridItem xs={6} style={Object.assign({},gridItemStyle,{flexDirection:'column',alignItems:'space-around'})}>
                              <div className={classes.iconContainerMainTitle} style={Object.assign({},gridItemStyle,{justifyContent:'flex-start'})}>
                                  {pool.token + "  "}
                                  <Hidden smUp>
                                    <i
                                        style={{color:primaryColor[0],marginLeft:'4px'}}
                                        className={"yfiiicon yfii-help-circle"} 
                                        onClick={
                                            event => {
                                                event.stopPropagation();
                                                window.open(isZh?pool.tokenDescriptionUrl2:pool.tokenDescriptionUrl)
                                            }
                                        }
                                        />
                                    </Hidden>
                                </div>
                              <span className={classes.iconContainerSubTitle}>{pool.token}</span>
                          </GridItem>
                      </GridItem>

                      <Hidden xsDown>
                        <GridItem sm={7} className="hidden-xs" style={Object.assign({},gridItemStyle,{justifyContent:'space-around'})}>
                            <GridItem sm={2}></GridItem>
                            <GridItem sm={3} container direction='column' justify='flex-start' alignItems="flex-start">
                                    <div className={classes.iconContainerMainTitle}>{forMat(balanceSingle)} { pool.token }</div>
                                    <div className={classes.iconContainerSubTitle}>{t('Vault-Balance')}</div>
                            </GridItem>
                            <GridItem sm={3}></GridItem>
                            <GridItem sm={4} container direction='column' justify='flex-start' alignItems="flex-start">
                                    <div className={classes.iconContainerMainTitle}>{depositedApy}</div>
                                    <div className={classes.iconContainerSubTitle}>{t('Vault-ListAPY')}</div>
                            </GridItem>
                        </GridItem>
                      </Hidden>
                      <Hidden smUp>
                            <GridItem xs={5} container justify='center' alignItems="flex-start">
                                    <GridItem xs={4} container direction='column' justify='center' alignItems="flex-start"></GridItem>
                                    <GridItem xs={8} container direction='column' justify='center' alignItems="flex-start">
                                        <div className={classes.iconContainerMainTitle}>{depositedApy}</div>
                                        <div className={classes.iconContainerSubTitle}>{t('Vault-ListAPY')}</div>
                                    </GridItem>
                            </GridItem>
                        </Hidden>

                      <GridItem xs={3} sm={3} style={Object.assign({},gridItemStyle,{justifyContent:'space-around',paddingLeft: '40px'})}>
                        <Hidden xsDown>
                            <IconButton
                                classes={{
                                    root:classes.iconContainerSecond
                                }}
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
                        </Hidden>
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
                      </GridItem>
                  </GridContainer>
              </AccordionSummary>
              <AccordionDetails style={{ justifyContent: "space-between"}}>
                <GridContainer style={{width: "100%", marginLeft: 0, marginRight: 0}}>
                  <GridItem xs={12} sm={6} className={classes.sliderDetailContainer}>
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
                                                margin: '12px 0',
                                                fontSize: '14px',
                                                fontWeight:'bold',
                                                backgroundColor:'#353848',
                                                color:'#FF2D82',
                                                boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)'
                                            }}
                                            round
                                            onFocus={(event) => event.stopPropagation()}
                                            disabled={
                                                !Boolean(depositedBalance[index]) || fetchDepositPending[index] || (new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber())
                                            }
                                            onClick={onDeposit.bind(this, pool, index, false, balanceSingle)}
                                            >{t('Vault-DepositButton')}
                                        </Button>
                                        {Boolean(pool.tokenAddress) && <Button 
                                            style={{
                                                width: '180px',
                                                margin: '12px 0',
                                                fontSize: '14px',
                                                fontWeight:'bold',
                                                backgroundColor:'#353848',
                                                color:'#FF2D82',
                                                boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)'
                                            }}
                                            round
                                            onFocus={(event) => event.stopPropagation()}
                                            disabled={
                                                fetchDepositPending[index] || (new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber())
                                            }
                                            onClick={onDeposit.bind(this, pool, index, true, balanceSingle)}
                                            >{t('Vault-DepositButtonAll')}
                                        </Button>}
                                    </div>
                                )
                            }
                        </div>
                    </GridItem>

                    <GridItem xs={12} sm={6} className={classes.sliderDetailContainer}>
                        <div className={classes.showDetailRight}>
                                {singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)).toFormat(4)} { pool.token } ({singleDepositedBalance.toFormat(4)} { pool.earnedToken })
                            </div>
                        <FormControl fullWidth variant="outlined">
                            <CustomOutlinedInput 
                                value={withdrawAmount[index]!=undefined ? withdrawAmount[index] : '0'}
                                onChange={changeDetailInputValue.bind(this,'withdrawAmount',index,singleDepositedBalance.toNumber(),pool.tokenDecimals)}
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
                                    margin: '12px 0',
                                    fontSize: '14px',
                                    fontWeight:'bold',
                                    backgroundColor:'#353848',
                                    color:'#635AFF',
                                    boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)'
                                }}
                                round
                                type="button"
                                color="primary"
                                disabled={fetchWithdrawPending[index] || !Boolean(withdrawAmount[index])}
                                onClick={onWithdraw.bind(this, pool, index, false, singleDepositedBalance)}
                                >
                                {fetchWithdrawPending[index] ? `${t('Vault-WithdrawING')}`: `${t('Vault-WithdrawButton')}`}
                            </Button>
                            <Button 
                                style={{
                                    width: '180px',
                                    margin: '12px 0',
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
                    </GridItem>

                  </GridContainer>
              </AccordionDetails>
            </Accordion>
          )
        })}
      </GridItem>
    </GridContainer>
  )
}
