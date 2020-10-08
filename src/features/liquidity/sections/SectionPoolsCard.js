/* eslint-disable */
import React, { useState, useEffect, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from "bignumber.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";

import { isEmpty } from 'features/helpers/utils';
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionActions'
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
// core components
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//  hooks
import { erc20Tokens } from '../config/erc20Tokens.js'
import sectionPoolsStyle from "../jss/sections/sectionPoolsStyle";

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionPoolsCard(props) {
  const {
    pool,
    index,
    openCard,
    cardIsOpenedList,
  } = props;

  const { t, i18n } = useTranslation();
  const classes = useStyles();

  const changeDetailInputValue = (type,index,total,tokenDecimals,event) => {
  }

  const handleDepositedBalance = (index,total,event,sliderNum) => {
  }

  const handleWithdrawAmount = (index,total,event,sliderNum) => {
  };

  const onApproval = (pool, index, event) => {
    event.stopPropagation();
  }

  const onDeposit = (pool, index, isAll, balanceSingle, event) => {
    event.stopPropagation();
  }

  const onWithdraw = (pool, index, isAll, singleDepositedBalance, event) => {
    event.stopPropagation();
  }

  const createCardFirstDropdownList = (canStakedTokenList) => {
    let cardFirstDropdownList = [];
    canStakedTokenList.map((id)=>{
      if (!isEmpty(erc20Tokens[id]) && erc20Tokens[id].name != 'LP'){
        cardFirstDropdownList.push(singleCardFirstDropDownNode(erc20Tokens[id]));
      }
    })
    return cardFirstDropdownList;
  }

  const singleCardFirstDropDownNode = (item) => {
    return (
      <div className={classes.subMemuStyle} key={item.name}>
          <Avatar 
            alt={item.name}
            src={require(`../../../images/${item.name}-logo.png`)}
            className={classNames({
                [classes.marginRight]:true,
                [classes.avatar]:true,
            })}
            />
          <span className={classes.avatarFont}>{item.name}</span>
      </div>
    )
  }

  const handleCardFirstDropdownListClick = (event) => {
    console.log('~~~~event~~~~~',event,event.key);
  }

  const cardFirstDropdownList = createCardFirstDropdownList(pool.canStakedTokenList);
  return (
    <Grid item xs={12} container key={index} style={{marginBottom: "24px"}} spacing={0}>
      <div style={{width: "100%"}}>
        <Accordion
          expanded={Boolean(cardIsOpenedList.includes(index))}
          className={classes.accordion}
          TransitionProps={{ unmountOnExit: true }}
          >
          <AccordionSummary
            className={classes.details}
            style={{ justifyContent: "space-between"}}
            onClick={(event) => {
              event.stopPropagation();
              openCard(index)
            }}>
            <Grid container alignItems="center" justify="space-around" spacing={4} style={{paddingTop: "16px", paddingBottom: "16px"}}>
              <Grid item>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src={require(`../../../images/${"WETH"}-logo.png`)} />
                    <Avatar alt="Travis Howard" src={require(`../../../images/${"ETH"}-logo.png`)} />
                    <Avatar alt="Cindy Baker" src={require(`../../../images/${"USDT"}-logo.png`)} />
                  </AvatarGroup>
                  </Grid>
                  <Grid item style={{minWidth: '100px'}}>
                    <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom>
                        {pool.token}
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
                        <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap></Typography>
                        <Typography className={classes.iconContainerSubTitle} variant="body2">{t('Vault-Balance')}</Typography></Grid>
                      </Grid>
                  </Hidden>
                  <Hidden mdDown>
                    <Grid item xs={4} container justify='center' alignItems="center">
                      <Grid item style={{width: "200px"}}>
                        <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap></Typography>
                        <Typography className={classes.iconContainerSubTitle} variant="body2">{t('Vault-Deposited')}</Typography>
                      </Grid>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} md={1} container justify='center' alignItems="center">
                    <Grid item>
                      <Typography className={classes.iconContainerMainTitle} variant="body2" gutterBottom noWrap></Typography>
                      <Typography className={classes.iconContainerSubTitle} variant="body2">{t('Vault-ListAPY')}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails style={{ justifyContent: "space-between"}}>
            <Grid container style={{width: "100%", marginLeft: 0, marginRight: 0}}>
              <Grid item xs={12} sm={4} className={classes.sliderDetailContainer}>
                <div className={classes.showDetailRight} style={{float: 'left',opacity: '1'}}>
                  选择币种
                </div>
                <FormControl fullWidth variant="outlined">
                  <CustomDropdown
                    popperClassName={classes.papperNav}
                    navDropdown
                    hoverColor='primary'
                    darkModal
                    buttonText={
                      isEmpty(pool.choicePoolName) ? '转换币种' : singleCardFirstDropDownNode({name:pool.choicePoolName})
                    }
                    buttonProps={{
                        className: classes.receiveStyle,
                    }}
                    // onClick={handleCardFirstDropdownListClick}
                    dropdownList={cardFirstDropdownList}
                    />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.sliderDetailContainer}>
                <div className={classes.showDetailRight}>
                </div>
                <FormControl fullWidth variant="outlined">
                  <CustomOutlinedInput 
                    // value={}
                    // onChange={}
                    />
                </FormControl>
                <CustomSlider 
                  classes={{
                    root: classes.depositedBalanceSliderRoot,
                    markLabel: classes.depositedBalanceSliderMarkLabel,
                  }}
                  aria-labelledby="continuous-slider" 
                  // value={depositedBalance['slider-'+index]?depositedBalance['slider-'+index]:0}
                  // onChange={handleDepositedBalance.bind(this,index,balanceSingle.toNumber())}
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
                          // onClick={onApproval.bind(this, pool, index)}
                          // disabled={fetchApprovalPending[index] }
                          >
                          {/* {fetchApprovalPending[index] ? `${t('Vault-ApproveING')}` : `${t('Vault-ApproveButton')}`} */}
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
                          // disabled={
                          //     !Boolean(depositedBalance[index]) || fetchDepositPending[index] || (new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber())
                          // }
                          // onClick={onDeposit.bind(this, pool, index, false, balanceSingle)}
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
                          // disabled={
                          //     fetchDepositPending[index] || (new BigNumber(depositedBalance[index]).toNumber() > balanceSingle.toNumber())
                          // }
                          // onClick={onDeposit.bind(this, pool, index, true, balanceSingle)}
                          >{t('Vault-DepositButtonAll')}
                        </Button>}
                      </div>
                    )
                  }
                </div>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.sliderDetailContainer}>
                <div className={classes.showDetailRight}>
                  {/* {singleDepositedBalance.multipliedBy(new BigNumber(pool.pricePerFullShare)).toFormat(4)} { pool.token } ({singleDepositedBalance.toFormat(4)} { pool.earnedToken }) */}
                </div>
                <FormControl fullWidth variant="outlined">
                  <CustomOutlinedInput 
                    // value={withdrawAmount[index]!=undefined ? withdrawAmount[index] : '0'}
                    // onChange={changeDetailInputValue.bind(this,'withdrawAmount',index,singleDepositedBalance.toNumber(),pool.tokenDecimals)}
                    />
                </FormControl>
                <CustomSlider 
                  classes={{
                      root: classes.drawSliderRoot,
                      markLabel: classes.drawSliderMarkLabel,
                  }}
                  aria-labelledby="continuous-slider" 
                  // value={withdrawAmount['slider-'+index]?withdrawAmount['slider-'+index]:0}
                  // onChange={handleWithdrawAmount.bind(this,index,singleDepositedBalance.toNumber())}
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
                    // disabled={fetchWithdrawPending[index] || !Boolean(withdrawAmount[index])}
                    // onClick={onWithdraw.bind(this, pool, index, false, singleDepositedBalance)}
                    >
                    {/* {fetchWithdrawPending[index] ? `${t('Vault-WithdrawING')}`: `${t('Vault-WithdrawButton')}`} */}
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
                    // onClick={onWithdraw.bind(this, pool, index, true, singleDepositedBalance)}
                    >
                    {/* {fetchWithdrawPending[index] ? `${t('Vault-WithdrawING')}`: `${t('Vault-WithdrawButtonAll')}`} */}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  )
}