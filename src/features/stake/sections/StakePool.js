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
import stakePoolsStyle from "../jss/sections/stakePoolsStyle";
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';

import { useFetchPoolsInfo } from '../redux/hooks';

const fontDefaultStyle = {
  color: '#fff',
  fontFamily: 'Helvetica',
  fontSize: '18px',
  letterSpacing: '0',
  lineHeight: '18px',
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    ...fontDefaultStyle,
    backgroundColor: '#635AFF',
    height:'48px',
    borderColor:'rgb(40,42,55,0.5)',
    padding:'0 40px',
    '&:first-child':{
      borderTopLeftRadius:'12px',
    },
    '&:last-child':{
      borderTopRightRadius:'12px',
    },
  },
  body: {
    ...fontDefaultStyle,
    padding:'20px 40px',
    backgroundColor: '#2C3040',
    borderColor:'rgb(40,42,55,0.5)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    
  },
}))(TableRow);

const useStyles = makeStyles(stakePoolsStyle);

// const rows = [{"id":"eth","name":"ETH","token":"ETH","tokenDescription":"ETH","tokenAddress":"","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iWETH","earnedTokenAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","earnContractAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","defaultApy":"39.54","pricePerFullShare":1.0010872907185218,"pastPricePerFullShare":1,"allowance":79228162514},{"id":"weth","name":"WETH","token":"WETH","tokenDescription":"WETH","tokenAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iWETH","earnedTokenAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","earnContractAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","defaultApy":"39.54","pricePerFullShare":1.0010872907185218,"pastPricePerFullShare":1,"allowance":79228162513},{"id":"usdt","name":"USDT","token":"USDT","tokenDescription":"USDT","tokenAddress":"0xdAC17F958D2ee523a2206206994597C13D831ec7","tokenDecimals":6,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iUSDT","earnedTokenAddress":"0x72Cf258c852Dc485a853370171d46B9D29fD3184","earnContractAddress":"0x72Cf258c852Dc485a853370171d46B9D29fD3184","defaultApy":"39.54","pricePerFullShare":1.0073106237422547,"pastPricePerFullShare":1,"allowance":79228162514},{"id":"usdc","name":"USDC","token":"USDC","tokenDescription":"USDC","tokenAddress":"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","tokenDecimals":6,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iUSDC","earnedTokenAddress":"0x23B4dB3a435517fd5f2661a9c5a16f78311201c1","earnContractAddress":"0x23B4dB3a435517fd5f2661a9c5a16f78311201c1","defaultApy":"39.54","pricePerFullShare":1.0067376619070039,"pastPricePerFullShare":1,"allowance":79228162514},{"id":"busd","name":"BUSD","token":"BUSD","tokenDescription":"BUSD","tokenAddress":"0x4Fabb145d64652a948d72533023f6E7A623C7C53","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iBUSD","earnedTokenAddress":"0xc46d2fC00554f1f874F37e6e3E828A0AdFEFfbcB","earnContractAddress":"0xc46d2fC00554f1f874F37e6e3E828A0AdFEFfbcB","defaultApy":"42.63","pricePerFullShare":1.0000225095467328,"pastPricePerFullShare":1,"allowance":79228161688.72224},{"id":"dai","name":"DAI","token":"DAI","tokenDescription":"DAI","tokenAddress":"0x6B175474E89094C44Da98b954EedeAC495271d0F","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"https://docs.yfii.finance/#/zh-cn/buy-tokens?id=_2-dai%e5%85%91%e6%8d%a2","earnedToken":"iDAI","earnedTokenAddress":"0x1e0DC67aEa5aA74718822590294230162B5f2064","earnContractAddress":"0x1e0DC67aEa5aA74718822590294230162B5f2064","defaultApy":"86.3","pricePerFullShare":1.013126052931122,"pastPricePerFullShare":1,"allowance":79228136867.08475}];

export default function StakePool(props) {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { pools, poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();
  const [ showDetail, setShowDetail ] = useState({});
  const [ showInput, setShowInput ] = useState(false);
  const [ pageSize,setPageSize ] = useState('');
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
    console.log(props.match.params.poolId)
  }, [fetchPoolsInfo]);
  
  return (
    <GridContainer>
      
      <div className={classes.detailContainer}>
        <div className={classes.detailTitle}>Stake / balancer</div>
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
                      alt={showDetail.name}
                      src={require(`../../../images/${showDetail.name}-logo.png`)}
                      className={classNames({
                        [classes.avatar]:true,
                      })}
                      />
                  </div>
                  <InputBase autoFocus className={classes.inputTxt}/>
                  <div className={classes.inputTxt}>{showDetail.name}</div>
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
                    onClick={(event)=>{
                      event.stopPropagation();
                    }}
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
