/* eslint-disable */
import React, { useState, useEffect, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from "bignumber.js";
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
import Slider from '@material-ui/core/Slider';
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
import { useWallet } from '../../home/redux/hooks';
import { useFetchBalances, useFetchPoolBalances, useFetchApproval, useFetchDeposit, useFetchWithdraw } from '../redux/hooks';

import sectionPoolsStyle from "../jss/sections/sectionPoolsStyle";

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionPools() {
  const { t, i18n } = useTranslation();
  const { web3, address } = useWallet();
  const { pools, fetchPoolBalances } = useFetchPoolBalances();
  const { tokens, fetchBalances } = useFetchBalances();
  const [ openedCardList, setOpenCardList ] = useState([0]);
  const classes = useStyles();

  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositPending } = useFetchDeposit();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();

  const [ depositedBalance, setDepositedBalance ] = useState({});
  const [ withdrawAmount, setWithdrawAmount ] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const calculateReallyNum = (total,sliderNum) => {
    if(sliderNum == undefined){
       return byDecimals(0, 0).toFormat(4);
    }
    return byDecimals(sliderNum/100*Number(total), 0).toFormat(4);
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

  const byDecimals = (number, tokenDecimals = 18) => {
    const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
    return new BigNumber(number).dividedBy(decimals);
  }

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
    fetchDeposit({
      address,
      web3,
      isAll,
      amount: new BigNumber(depositedBalance[index]).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
      contractAddress: pool.earnContractAddress,
      index
    }).then(
      () => enqueueSnackbar(`Deposit success`, {variant: 'success'})
    ).catch(
      error => enqueueSnackbar(`Deposit error: ${error}`, {variant: 'error'})
    )
  }

  const onWithdraw = (pool, index, isAll, singleDepositedBalance, event) => {
    event.stopPropagation();
    // console.log(isAll)
    if (isAll) {
      setWithdrawAmount({
        ...depositedBalance,
        [index]: forMat(singleDepositedBalance),
        [`slider-${index}`]: 100,
      })
    }
    fetchWithdraw({
      address,
      web3,
      isAll,
      amount: new BigNumber(withdrawAmount[index]).multipliedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)).toString(10),
      contractAddress: pool.earnContractAddress,
      index
    }).then(
      () => enqueueSnackbar(`Withdraw success`, {variant: 'success'})
    ).catch(
      error => enqueueSnackbar(`Withdraw error: ${error}`, {variant: 'error'})
    )
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

  //滑块
  const marks = [
    {
        value: 0,
        label: '0%',
      },
      {
        value: 25,
        label: '25%',
      },
      {
        value: 50,
        label: '50%',
      },
      {
        value: 75,
        label: '75%',
      },
      {
        value: 100,
        label: '100%',
      },
  ];
 
  const valuetext = (value) => {
    return `${value}°C`;
  }

  return (
    <GridContainer justify="center">
      <GridItem md={12} xs={12} sm={10}>
        {pools.map((pool, index) => {
          let balanceSingle = byDecimals(tokens[pool.token].tokenBalance, pool.tokenDecimals);
          let singleDepositedBalance = byDecimals(tokens[pool.earnedToken].tokenBalance, pool.tokenDecimals);
          let depositedApy = new BigNumber(pool.pricePerFullShare).minus(new BigNumber(pool.pastPricePerFullShare)).multipliedBy(new BigNumber(100)).toFormat(4);
          return (
            <Accordion
              key={index}
              expanded={Boolean(openedCardList.includes(index))}
              className={classes.accordionMargin}
            >
              <AccordionSummary
                className={classes.details}
                style={{ justifyContent: "space-between"}}
              >
                  <GridContainer style={{width: "100%", marginLeft: 0, marginRight: 0}}>
                      <GridItem xs={6} sm={2} style={Object.assign({},{},gridItemStyle,{justifyContent:'flex-start'})}>
                          <GridItem xs={6}>
                              <Avatar 
                              alt={pool.token}
                              src={require(`../../../images/${pool.token}-logo.png`)}
                              style={{}}
                              />
                          </GridItem>
                          <GridItem xs={6} style={Object.assign({},gridItemStyle,{flexDirection:'column',alignItems:'space-around'})}>
                              <div className={classes.iconContainerMainTitle}>{pool.token}</div>
                              <span className={classes.iconContainerSubTitle}>{pool.token}</span>
                          </GridItem>
                      </GridItem>

                      <GridItem xs={12} sm={7} className="hidden-xs" style={Object.assign({},gridItemStyle,{justifyContent:'space-around'})}>
                          <div style={Object.assign({},gridItemStyle,{flexDirection:'column',alignItems:'space-around'})}>
                              <div className={classes.iconContainerMainTitle}>{forMat(balanceSingle)} { pool.token }</div>
                              <div className={classes.iconContainerSubTitle}>{t('Vault-Balance')}</div>
                          </div>
                          <div style={Object.assign({},gridItemStyle,{flexDirection:'column',alignItems:'space-around'})}>
                              <div className={classes.iconContainerMainTitle}>{depositedApy}%</div>
                              <div className={classes.iconContainerSubTitle}>{t('Vault-ListAPY')}</div>
                          </div>
                      </GridItem>

                      <GridItem xs={6} sm={3} style={Object.assign({},gridItemStyle,{justifyContent:'space-around',paddingLeft: '80px'})}>
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
                          <IconButton
                              className={classes.iconContainerPrimary}
                              onClick={() => openCard(index)}
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
                    <div className={classes.showDetail}>
                      <div className={classes.showDetailLeft}>
                          {
                              depositedBalance['slider-'+index] ? calculateReallyNum(balanceSingle.toNumber(),depositedBalance['slider-'+index]) : '0.0000'
                          }
                      </div>
                      <div className={classes.showDetailRight}>
                          {t('Vault-Balance')}:{balanceSingle.toFormat(4)} { pool.token }
                      </div>
                    </div>
                    <Slider 
                      classes={{
                        root: classes.depositedBalanceSliderRoot,
                        markLabel: classes.depositedBalanceSliderMarkLabel,
                        rail:classes.depositedBalanceSliderRail,
                        mark:classes.depositedBalanceSliderMark,
                      }}
                      aria-labelledby="continuous-slider" 
                      defaultValue={0}
                      value={depositedBalance['slider-'+index]?depositedBalance['slider-'+index]:0}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      marks={marks}
                      onChange={handleDepositedBalance.bind(this,index,balanceSingle.toNumber())}
                    />
                    
                        <div>
                            {
                                depositedBalance[index]>pool.allowance ? (
                                    <div className={classes.showDetailButtonCon}>
                                        <Button 
                                            style={{
                                                backgroundColor:'#353848',
                                                color:'#FF2D82',
                                                boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)'
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
                                                fetchDepositPending[index] || (new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber())
                                            }
                                            onClick={onDeposit.bind(this, pool, index, true, balanceSingle)}
                                            >{t('Vault-DepositButtonAll')}
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                    </GridItem>

                    <GridItem xs={12} sm={6} className={classes.sliderDetailContainer}>
                        <div className={classes.showDetail}>
                            <div className={classes.showDetailLeft}>
                                {
                                    withdrawAmount['slider-'+index] ? calculateReallyNum(singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)).toNumber(),withdrawAmount['slider-'+index]) : '0.0000'
                                }
                            </div>
                            <div className={classes.showDetailRight}>
                                {singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)).toFormat(4)} { pool.token } ({singleDepositedBalance.toFormat(4)} { pool.earnedToken })
                            </div>
                        </div>
                        <Slider 
                            classes={{
                                root: classes.drawSliderRoot,
                                markLabel: classes.drawSliderMarkLabel,
                                rail:classes.depositedBalanceSliderRail,
                                mark:classes.depositedBalanceSliderMark,
                            }}
                            aria-labelledby="continuous-slider" 
                            defaultValue={0}
                            value={withdrawAmount['slider-'+index]?withdrawAmount['slider-'+index]:0}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            marks={marks}
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
