import React, { useState, useEffect } from 'react';
import { useConnectWallet } from '../../home/redux/hooks';
import { useFetchBalances, useCheckApproval, useFetchApproval } from '../redux/hooks';
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
import {byDecimals,calculateReallyNum} from 'components/utils';
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";

const useStyles = makeStyles(zapCommandStyle);

export default function ZapCommand() {
    const classes = useStyles();
    const { web3, address } = useConnectWallet();
    const { tokens, fetchBalances } = useFetchBalances();
    const { checkApproval } = useCheckApproval();
    const { fetchApproval } = useFetchApproval();

    useEffect(() => {
      if (address && web3) {
        checkApproval();
        fetchBalances();
      }
    }, [address, web3, fetchBalances]);

    const onFetchApproval = () => {
      fetchApproval('DAI', "yCurveZapAddress")
    }


    const [showIndex,setShowIndex] = useState(0);
    const handleMainDropdownClick = (event) => {
        setShowIndex(event.key);
        setSendJson({'num':0,'slider':0});
        receiveJson({'num':0});
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
                    className={classes.marginRight}
                    />
                {item.name}
            </div>
        );
        return true;
    });

    const [ subInfo, setSubInfo] = useState({})
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
            <div className={classes.memuStyle} key={item.name}>
                <Avatar 
                    alt={item.name}
                    src={require(`../../../images/${item.name}-logo.png`)}
                    className={classes.marginRight}
                    />
                {item.name}
                {
                    item.needTUSD && (
                        <div className={classes.memuStyle}>
                            <span style={{margin:'0 8px'}}>+</span>
                            <Avatar 
                                alt='TUSD'
                                src={require(`../../../images/TUSD-logo.png`)}
                                className={classes.marginRight}
                                />
                            TUSD
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
    const [receiveJson,setReceiveJson] = useState({'num':0});
    const changeMainInput = (total,tokenDecimals,event)=>{
        event.stopPropagation();
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
        setSendJson({
            'num':inputVal > total ? byDecimals(total,0).toFormat(tokenDecimals) :value,
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

    console.warn('~~~~~~tokens~~~~~~',tokens);
    let buttonTxt = 'Trade';
    if(subInfo.type){
        buttonTxt = subInfo.type
    }
    let balanceTotal = byDecimals(tokens[showIndex].balance,tokens[showIndex].decimals);
    return (
        <div className={classes.container}>
            <div className={classes.zapContainer}>
                <div className={classes.mainTitle}>Zap</div>
                <h3 className={classes.secondTitle}>Exchange your assets</h3>
                <div className={classes.boxContainer}>
                    <div className={classes.boxHeader}>
                        <div className={classes.boxHeaderMain}>Send</div>
                        <div className={classes.boxHeaderSub}>Balance: {balanceTotal.toFormat(tokens[showIndex].decimals)} {tokens[showIndex].name}</div>
                    </div>
                    <FormControl fullWidth variant="outlined">
                        <CustomOutlinedInput 
                            value={sendJson.num}
                            onChange={changeMainInput.bind(this,balanceTotal.toNumber(),tokens[showIndex].decimals)}
                            endAdornment={
                                <div className={classes.endAdornment}>
                                    <CustomButtons>MAX</CustomButtons>
                                    <CustomDropdown
                                        navDropdown
                                        hoverColor='primary'
                                        buttonText={
                                            <div className={classes.memuStyle}>
                                                <Avatar 
                                                    alt={tokens[showIndex].name}
                                                    src={require(`../../../images/${tokens[showIndex].name}-logo.png`)}
                                                    className={classes.marginRight}
                                                    />
                                                {tokens[showIndex].name}
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
                        <div className={classes.boxHeaderMain}>Receive</div>
                        {/* <div className={classes.boxHeaderSub}>Current Price: 1 ETH = 339.5905 USDT</div> */}
                    </div>
                    <FormControl fullWidth variant="outlined">
                        <CustomOutlinedInput 
                            value={receiveJson.num}
                            // onChange={changeDetailInputValue.bind(this,'withdrawAmount',index,singleDepositedBalance.toNumber(),pool.tokenDecimals)}
                            endAdornment={
                                <CustomDropdown
                                    navDropdown
                                    hoverColor='primary'
                                    buttonText={
                                        subInfo.name && tokens[showIndex].receivableList.find((item)=>{return item.name==subInfo.name}) ? 
                                        singleSubDropDownNode(subInfo)
                                        :
                                        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                    }
                                    buttonProps={{
                                        className: classes.navLink,
                                        color: "transparent",
                                    }}
                                    onClick={handleSubDropdownClick}
                                    dropdownList={subDropdownList}
                                    />
                            }
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
                    }}
                    color="primary"
                    // onClick={onApproval.bind(this, pool, index)}
                    >
                    {buttonTxt}
                </Button>
            </div>
        </div>
    )
}