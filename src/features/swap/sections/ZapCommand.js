import React, { useState, useEffect } from 'react';
import BigNumber from "bignumber.js";
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import { useConnectWallet } from '../../home/redux/hooks';
import { useFetchBalances, useCheckApproval, useFetchApproval, useFetchZapOrSwap } from '../redux/hooks';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import { makeStyles } from "@material-ui/core/styles";
import CustomSlider from 'components/CustomSlider/CustomSlider';
import FormControl from '@material-ui/core/FormControl';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import CustomButtons from "components/CustomButtons/Button.js";
import Button from '@material-ui/core/Button';
import zapCommandStyle from "../jss/sections/zapCommandStyle";
import Avatar from '@material-ui/core/Avatar';
import {byDecimals,calculateReallyNum} from 'features/helpers/bignumber';
import { inputLimitPass,inputFinalVal } from 'features/helpers/utils';
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

const useStyles = makeStyles(zapCommandStyle);

export default function ZapCommand() {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const { web3, address } = useConnectWallet();
    const { tokens, fetchBalances } = useFetchBalances();
    const { allowance, checkApproval } = useCheckApproval();
    const { fetchApproval,fetchApprovalPending } = useFetchApproval();
    const { fetchZapOrSwap } = useFetchZapOrSwap();
    const [ isApproval, setIsApproval ] = useState(false);
    const [showIndex,setShowIndex] = useState(0);
    const [ subInfo, setSubInfo] = useState({});

    useEffect(() => {
      if (address && web3) {
        checkApproval();
        fetchBalances();
      }
    }, [address, web3, fetchBalances]);

    useEffect(() => {
      if(!Boolean(showIndex && subInfo.contract)) return;
      const item = allowance.filter(item => { return item.name === tokens[showIndex].name })[0]
      console.log(item)
      const pool = item.pools.filter(item => { return item.name === subInfo.contract.name })[0]
      setIsApproval(!Boolean(pool.allowance==0))
    }, [tokens, showIndex, address, subInfo.contract]);

    const onFetchApproval = () => {
      console.log(Boolean(subInfo.contract)?'1':'2')
      console.log(Boolean(tokens[showIndex].name && subInfo.contract)?'1':'2')
      console.log(!Boolean(tokens[showIndex].name && subInfo.contract)?'1':'2')
      console.log(subInfo)
      fetchApproval(tokens[showIndex].name, subInfo.contract.name)
    }

    const onFetchZapOrSwap = () => {
      fetchZapOrSwap(tokens[showIndex].name, subInfo.name, new BigNumber(sendJson.num).multipliedBy(new BigNumber(10).exponentiatedBy(tokens[showIndex].decimals)).toString(10))
    }
    
    const handleMainDropdownClick = (event) => {
        setShowIndex(event.key);
        setSendJson({'num':0,'slider':0});
        if(!tokens[event.key].receivableList.find((item)=>{return item.name==subInfo.name})){
            setSubInfo({});
        }
    };
    let mainDropdownList = [];
    tokens.map((item,index)=>{
        mainDropdownList.push(
            <div className={classes.memuStyle} key={index}>
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
        );
        return true;
    });

    const handleSubDropdownClick = (event) => {
        let targetInfo = tokens[showIndex].receivableList.find((item)=>{return item.name==event.key})
        if(targetInfo){
            setSubInfo(targetInfo);
        }else{
            setSubInfo({});
        }
    };

    const singleSubDropDownNode = (item) => {
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
                {
                    item.needTUSD && (
                        <div className={classes.subMemuStyle}>
                            <span style={{margin:'0 8px'}}>+</span>
                            <Avatar 
                                alt='TUSD'
                                src={require(`../../../images/TUSD-logo.png`)}
                                className={classNames({
                                    [classes.marginRight]:true,
                                    [classes.avatar]:true,
                                })}
                                />
                            <span className={classes.avatarFont}>TUSD</span>
                        </div>
                    )
                }
            </div>
        )
    }
    let subDropdownList = [];
    tokens[showIndex].receivableList.map((item)=>{
        subDropdownList.push(singleSubDropDownNode(item))
    })

    const [sendJson,setSendJson] = useState({'num':0,'slider':0});
    const changeMainInput = (total,tokenDecimals,event)=>{
        event.stopPropagation();
        let value = event.target.value;
        if(!inputLimitPass(value,tokenDecimals)){
          return;
        }
        let sliderNum = 0;
        let inputVal = Number(value.replace(',',''));
        if(value){
            sliderNum = byDecimals(inputVal/total,0).toFormat(2) * 100;
        }
        setSendJson({
            'num':inputFinalVal(value,total,tokenDecimals),
            'slider': sliderNum,
        })
    }

    const changeSliderVal = (total,event,sliderNum) => {
        event.stopPropagation();
        setSendJson({
            'num': sliderNum == 0 ? 0: calculateReallyNum(total,sliderNum),
            'slider': sliderNum,
        })
    }

    let buttonTxt = 'Trade';
    if(subInfo.type){
        buttonTxt = subInfo.type
    }
    let balanceTotal = byDecimals(tokens[showIndex].balance,tokens[showIndex].decimals);
    return (
        <div className={classes.container}>
            <div className={classes.zapContainer}>
                <div className={classes.mainTitle}>{t('Swap-Header')}</div>
                <h3 className={classes.secondTitle}>{t('Swap-Title')}</h3>
                <div className={classes.boxContainer}>
                    <div className={classes.boxHeader}>
                        <div className={classes.boxHeaderMain}>{t('Swap-Send')}</div>
                        <div className={classes.boxHeaderSub}>{`${t('Swap-Balance')}: ${balanceTotal.toFormat(tokens[showIndex].decimals)} ${tokens[showIndex].name}`}</div>
                    </div>
                    <FormControl fullWidth variant="outlined">
                        <CustomOutlinedInput 
                            value={sendJson.num}
                            onChange={changeMainInput.bind(this,balanceTotal.toNumber(),tokens[showIndex].decimals)}
                            endAdornment={
                                <div className={classes.endAdornment}>
                                    <div className={classes.maxButtonBox}>
                                        <CustomButtons
                                            onClick={()=>{
                                                setSendJson({'num':balanceTotal.toFormat(tokens[showIndex].decimals),'slider':100})
                                            }}
                                            className={classes.maxButton}>
                                            {t('Swap-Max')}
                                        </CustomButtons>
                                    </div>
                                    <CustomDropdown
                                        navDropdown
                                        hoverColor='primary'
                                        darkModal
                                        buttonText={
                                            <div className={classes.memuStyle}>
                                                <Avatar 
                                                    alt={tokens[showIndex].name}
                                                    src={require(`../../../images/${tokens[showIndex].name}-logo.png`)}
                                                    className={classNames({
                                                        [classes.marginRight]:true,
                                                        [classes.avatar]:true,
                                                    })}
                                                    />
                                                <span className={classes.avatarFont}>{tokens[showIndex].name}</span>
                                            </div>
                                        }
                                        buttonProps={{
                                            className: classes.navLink,
                                            color: "transparent",

                                        }}
                                        onClick={handleMainDropdownClick}
                                        dropdownList={mainDropdownList}
                                        />
                                </div>
                            }
                            />
                    </FormControl>
                    <GridItem>
                        <CustomSlider 
                            aria-labelledby="continuous-slider" 
                            value={sendJson.slider}
                            onChange={changeSliderVal.bind(this,balanceTotal.toNumber())}
                            />
                    </GridItem>
                </div>
                <div className={classes.boxContainer}>
                    <div className={classes.boxHeader}>
                        <div className={classes.boxHeaderMain}>{t('Swap-Receive')}</div>
                        {/* <div className={classes.boxHeaderSub}>Current Price: 1 ETH = 339.5905 USDT</div> */}
                    </div>
                    <FormControl fullWidth variant="outlined">
                        <CustomDropdown
                            popperClassName={classes.papperNav}
                            navDropdown
                            hoverColor='primary'
                            darkModal
                            buttonText={
                                subInfo.name && tokens[showIndex].receivableList.find((item)=>{return item.name==subInfo.name}) &&
                                singleSubDropDownNode(subInfo)
                            }
                            buttonProps={{
                                className: classes.receiveStyle,
                            }}
                            onClick={handleSubDropdownClick}
                            dropdownList={subDropdownList}
                            />
                    </FormControl>
                </div>
                <Button 
                    style={{
                        width:'100%',
                        height:'64px',
                        borderRadius:'32px',
                        backgroundColor:'#FF2D82',
                        color:'#FFF',
                        boxShadow:'0 2px 2px 0 rgba(53, 56, 72, 0.14), 0 3px 1px -2px rgba(53, 56, 72, 0.2), 0 1px 5px 0 rgba(53, 56, 72, 0.12)',
                        fontWeight: "550",
                        fontFamily: 'Helvetica',
                        fontSize: '22px',
                        letterSpacing: '0',
                        textAlign: 'center',
                        lineHeight: '22px',
                        marginTop:'12px',
                        marginBottom:'12px',
                    }}
                    color="primary"
                    onClick={isApproval?onFetchZapOrSwap:onFetchApproval}
                    disabled={!Boolean(tokens[showIndex].name && subInfo.contract) && fetchApprovalPending}
                  >
                      {
                          fetchApprovalPending ? '...' :buttonTxt
                      }
                </Button>
            </div>
        </div>
    )
}