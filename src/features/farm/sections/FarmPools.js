import React, {useState, useEffect} from 'react';
import classNames from "classnames";
import {useTranslation} from 'react-i18next';
import {makeStyles} from "@material-ui/core/styles";
import farmItemStyle from "../jss/sections/farmItemStyle";
import Grid from '@material-ui/core/Grid';
// core components
import Button from "components/CustomButtons/Button.js";
import {useFetchPoolsInfo} from '../redux/hooks';
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles(farmItemStyle);


export default () => {
  const classes = useStyles();
  const {t, i18n} = useTranslation();
  const {pools, poolsInfo, fetchPoolsInfo} = useFetchPoolsInfo();

  useEffect(() => {
    fetchPoolsInfo();
  }, [pools, fetchPoolsInfo]);

  const offsetImageStyle = {marginLeft: "-25%", zIndex: 0, background: '#ffffff'}
  return (
    <Grid container style={{paddingTop: '4px'}}>
      <Grid item xs={12}>
        <div className={classes.mainTitle}>{t('Farm-Main-Title')}</div>
        <h3 className={classes.secondTitle}>{t('Farm-Second-Title')}</h3>
      </Grid>
      <Grid container item xs={12} justify={"center"}>
        {pools.map((pool, index) => {
          const {token, name, earnedToken, earnedTokenAddress, color, tokenDescription} = pool;

          // 根据名称是否含有LP判断是否是存 LPToken对
          const isLP = name.toLowerCase().indexOf('lp') > -1;

          const lpTokens = isLP ? token.split('/') : [];

          return (
            <Grid item sm={6} key={index}>
              <div style={{background: `rgba(${color},0.5)`}} className={classNames({
                [classes.flexColumnCenter]: true,
                [classes.farmItem]: true
              })} key={index}>
                {/*Logo处理*/}
                {isLP && lpTokens.length === 2 ? (
                  <div className={classes.logo}>
                    {lpTokens.map((item, index) => {
                      console.log(`../../../images/${item}-logo.png`);
                      return (
                        <Avatar key={index}
                                src={require(`../../../images/${item}-logo.png`)} className={classes.logoImage}
                                style={index > 0 ? offsetImageStyle : {}}
                        />
                      )
                    })}
                  </div>
                ) : <Avatar src={require(`../../../images/${token}-logo.png`)} className={classes.logoImage}/>}
                <div className={classes.weightFont} style={{marginTop: 10}}>{token}</div>

                <div style={{fontSize: 13}}>
                  {t('Farm-Stake')} {tokenDescription}
                </div>
                <div style={{fontSize: 13, marginTop: -5}}>{t('Farm-Earn')} {earnedToken}</div>

                <div className={classes.weightFont} style={{margin: 15}}>APY {poolsInfo[index].apy}</div>

                {/*操作菜单*/}
                <div className={classes.menu} style={isLP ? {} : {justifyContent: 'center'}}>
                  {isLP ? (
                    <>
                      <Button className={classes.menuButton}
                              href={`/#/farm/pool/${index + 1}`}
                              style={{background: `rgb(${color})`}}>
                        {t('Farm-Mining')}
                      </Button>
                      <Button
                        className={classes.menuButton}
                        href={`https://app.uniswap.org/#/add/ETH/${earnedTokenAddress}`}
                        target={"_blank"}
                        style={{background: `rgb(${color})`}}>
                        {t('Farm-Get')} LP Token
                      </Button>
                    </>
                  ) : <Button
                    className={classes.menuButton}
                    href={`/#/farm/pool/${index + 1}`}
                    style={{background: `rgb(${color})`}}>{t('Farm-Mining')}</Button>}
                </div>
              </div>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}