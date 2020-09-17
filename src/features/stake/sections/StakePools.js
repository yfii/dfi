import React,{ useState, useEffect } from 'react';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer.js";
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

const rows = [{"id":"eth","name":"ETH","token":"ETH","tokenDescription":"ETH","tokenAddress":"","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iWETH","earnedTokenAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","earnContractAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","defaultApy":"39.54","pricePerFullShare":1.0010872907185218,"pastPricePerFullShare":1,"allowance":79228162514},{"id":"weth","name":"WETH","token":"WETH","tokenDescription":"WETH","tokenAddress":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iWETH","earnedTokenAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","earnContractAddress":"0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6","defaultApy":"39.54","pricePerFullShare":1.0010872907185218,"pastPricePerFullShare":1,"allowance":79228162513},{"id":"usdt","name":"USDT","token":"USDT","tokenDescription":"USDT","tokenAddress":"0xdAC17F958D2ee523a2206206994597C13D831ec7","tokenDecimals":6,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iUSDT","earnedTokenAddress":"0x72Cf258c852Dc485a853370171d46B9D29fD3184","earnContractAddress":"0x72Cf258c852Dc485a853370171d46B9D29fD3184","defaultApy":"39.54","pricePerFullShare":1.0073106237422547,"pastPricePerFullShare":1,"allowance":79228162514},{"id":"usdc","name":"USDC","token":"USDC","tokenDescription":"USDC","tokenAddress":"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48","tokenDecimals":6,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iUSDC","earnedTokenAddress":"0x23B4dB3a435517fd5f2661a9c5a16f78311201c1","earnContractAddress":"0x23B4dB3a435517fd5f2661a9c5a16f78311201c1","defaultApy":"39.54","pricePerFullShare":1.0067376619070039,"pastPricePerFullShare":1,"allowance":79228162514},{"id":"busd","name":"BUSD","token":"BUSD","tokenDescription":"BUSD","tokenAddress":"0x4Fabb145d64652a948d72533023f6E7A623C7C53","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iBUSD","earnedTokenAddress":"0xc46d2fC00554f1f874F37e6e3E828A0AdFEFfbcB","earnContractAddress":"0xc46d2fC00554f1f874F37e6e3E828A0AdFEFfbcB","defaultApy":"42.63","pricePerFullShare":1.0000225095467328,"pastPricePerFullShare":1,"allowance":79228161688.72224},{"id":"dai","name":"DAI","token":"DAI","tokenDescription":"DAI","tokenAddress":"0x6B175474E89094C44Da98b954EedeAC495271d0F","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"https://docs.yfii.finance/#/zh-cn/buy-tokens?id=_2-dai%e5%85%91%e6%8d%a2","earnedToken":"iDAI","earnedTokenAddress":"0x1e0DC67aEa5aA74718822590294230162B5f2064","earnContractAddress":"0x1e0DC67aEa5aA74718822590294230162B5f2064","defaultApy":"86.3","pricePerFullShare":1.013126052931122,"pastPricePerFullShare":1,"allowance":79228136867.08475},{"id":"hbtc","name":"HBTC","token":"HBTC","tokenDescription":"HBTC","tokenAddress":"0x0316eb71485b0ab14103307bf65a021042c6d380","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iHBTC","earnedTokenAddress":"0x26AEdD2205FF8a87AEF2eC9691d77Ce3f40CE6E9","earnContractAddress":"0x26AEdD2205FF8a87AEF2eC9691d77Ce3f40CE6E9","defaultApy":"86.3","pricePerFullShare":1.0000084742029929,"pastPricePerFullShare":1,"allowance":79228162513.8444},{"id":"tusd","name":"TUSD","token":"TUSD","tokenDescription":"TUSD","tokenAddress":"0x0000000000085d4780B73119b644AE5ecd22b376","tokenDecimals":18,"tokenDescriptionUrl":"","tokenDescriptionUrl2":"","earnedToken":"iTUSD","earnedTokenAddress":"0x4243f5C8683089b65a9F588B1AE578d5D84bFBC9","earnContractAddress":"0x4243f5C8683089b65a9F588B1AE578d5D84bFBC9","defaultApy":"42.63","pricePerFullShare":1.0045269036238986,"pastPricePerFullShare":1,"allowance":79228162365.43619},{"id":"ycrv","name":"yCRV","token":"yCRV","tokenDescription":"yCRV","tokenAddress":"0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8","tokenDecimals":18,"tokenDescriptionUrl":"https://docs.yfii.finance/#/using-crv?id=how-to-get-ycrv","tokenDescriptionUrl2":"https://docs.yfii.finance/#/zh-cn/buy-tokens?id=_5-ycrv%e5%85%91%e6%8d%a2","earnedToken":"iYCRV","earnedTokenAddress":"0x3E3db9cc5b540d2794DB3861BE5A4887cF77E48B","earnContractAddress":"0x3E3db9cc5b540d2794DB3861BE5A4887cF77E48B","defaultApy":"42.63","pricePerFullShare":1.004716633541632,"pastPricePerFullShare":1,"allowance":79228160871.59212}];

export default function StakePools() {
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const [ showDetail, setShowDetail ] = useState({'anme':21});
    console.warn('~~~~~showDetail~~~~~~~',showDetail);
    return (
        <GridContainer>
            {
                isEmpty(showDetail) ? (
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell >{t('Stake-Table-Pool')}</StyledTableCell>
                                <StyledTableCell >{t('Stake-Table-Staked')}</StyledTableCell>
                                <StyledTableCell >{t('Stake-Table-Total')}</StyledTableCell>
                                <StyledTableCell >{t('Stake-Table-Pay')}</StyledTableCell>
                                <StyledTableCell ></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody classes={{
                            root:classes.tableBodyRoot
                        }}>
                            {rows.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th">
                                        <div className={classes.firstCell}>
                                            <div className={classes.avatarContainer}>
                                                <Avatar 
                                                    alt={row.name}
                                                    src={require(`../../../images/${row.name}-logo.png`)}
                                                    className={classNames({
                                                        [classes.avatar]:true,
                                                    })}
                                                    />
                                            </div>
                                            <div className={classes.firstCellContent}>
                                                <div>{row.name}</div>
                                                <div>{row.name}</div>
                                            </div>
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell >$40,027,383.88</StyledTableCell>
                                    <StyledTableCell >$40,027,383.88</StyledTableCell>
                                    <StyledTableCell >223%</StyledTableCell>
                                    <StyledTableCell component="th" >
                                        <CustomButtons
                                            onClick={(event)=>{
                                                event.stopPropagation();
                                                setShowDetail(row);
                                            }}
                                            className={classes.stakeButton}>
                                            {t('Stake-Button-Stake')}
                                        </CustomButtons>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                ):(
                    <div className={classes.detailContainer}>
                        <div className={classes.detailTitle}>Stake / balancer</div>
                        <div className={classes.detailContent}>
                            <div>
                                
                            </div>
                        </div>
                    </div>
                )
            }
            
        </GridContainer>
    )
}
