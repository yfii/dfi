import React, {useState, useEffect} from 'react';
import classNames from "classnames";
import {useTranslation} from 'react-i18next';
import {makeStyles} from "@material-ui/core/styles";
import {farmPoolsStyle} from "../jss/sections/farmPoolsStyle";
import Grid from '@material-ui/core/Grid';
// core components
import Button from "components/CustomButtons/Button.js";
import {useFetchPoolsInfo} from '../redux/hooks';
import FarmItem from "../components/FarmItem";

const useStyles = makeStyles(farmPoolsStyle);

export default function FarmPools(props) {
  const classes = useStyles();
  const {t, i18n} = useTranslation();
  const {pools, fetchPoolsInfo} = useFetchPoolsInfo();

  useEffect(() => {
    fetchPoolsInfo();
  }, [pools, fetchPoolsInfo]);

  return (
    <Grid container style={{paddingTop: '4px'}}>
      <Grid item xs={12}>
        <div className={classes.mainTitle}>{t('Stake-Main-Title')}</div>
        <h3 className={classes.secondTitle}>{t('Stake-Second-Title')}</h3>
      </Grid>
      <Grid container item xs={12} justify={"center"}>
        {pools.map((pool, index) => (
          <Grid item sm={6} key={index}>
            <FarmItem farmInfo={pool} index={index}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}