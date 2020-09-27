import React, {useState, useEffect} from 'react';
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import farmItemStyle from "../jss/sections/farmItemStyle";
import Button from "../../../components/CustomButtons/Button";
import {Avatar} from "@material-ui/core";

const useStyles = makeStyles(farmItemStyle);

export default (props) => {
  const classes = useStyles();
  const {index, farmInfo: {token, name, earnedToken, earnedTokenAddress, color}} = props;
  // 根据名称是否含有LP判断是否是存 LPToken对
  const isLP = name.toLowerCase().indexOf('lp') > -1;
  const lpTokens = isLP ? token.split('/') : [];

  const offsetImageStyle = {marginLeft: "-25%", zIndex: 0, background: '#ffffff'}

  return (
    <div style={{background: `rgba(${color},0.5)`}} className={classNames({
      [classes.flexColumnCenter]: true,
      [classes.farmItem]: true
    })}>
      {/*Logo处理*/}
      {isLP && lpTokens.length === 2 ? (
        <div className={classes.logo}>
          {lpTokens.map((item, index) => {
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
        存入 {isLP ? token + ' UNI-V2 LP' : token}
      </div>
      <div style={{fontSize: 13, marginTop: -5}}>赚取 {earnedToken}</div>

      <div className={classes.weightFont} style={{margin: 15}}>APY 322%</div>

      {/*操作菜单*/}
      <div className={classes.menu} style={isLP ? {} : {justifyContent: 'center'}}>
        {isLP ? (
          <>
            <Button className={classes.menuButton} href={`/#/farm/pool/${index + 1}`}
                    style={{background: `rgb(${color})`}}>挖矿</Button>
            <Button
              className={classes.menuButton}
              href={`https://more.ethte.com/web/uniswap-2/#/add/ETH/${earnedTokenAddress}`}
              target={"_blank"}
              style={{background: `rgb(${color})`}}>
              获取LP
            </Button>
          </>
        ) : <Button
          className={classes.menuButton}
          href={`/#/farm/pool/${index + 1}`}
          style={{background: `rgb(${color})`}}>挖矿</Button>}
      </div>
    </div>
  )
}