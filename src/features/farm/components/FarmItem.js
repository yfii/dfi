import React, {useState, useEffect} from 'react';
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import farmItemStyle from "../jss/sections/farmItemStyle";
import Button from "../../../components/CustomButtons/Button";

const useStyles = makeStyles(farmItemStyle);

export default (props) => {
  const {style, index, farmInfo} = props;
  const classes = useStyles();
  return (
    <div style={style} className={classNames({
      [classes.flexColumnCenter]: true
    })}>
      <Button href={`/#/farm/pool/${index + 1}`}>抵押</Button>
    </div>
  )
}