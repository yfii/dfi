import {
  title,
  mrAuto,
  mlAuto,
  primaryColor,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

import checkboxes from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.js";
import tooltips from "assets/jss/material-kit-pro-react/tooltipsStyle.js";
import { rgbToHex } from "@material-ui/core";

const sectionPoolsStyle = theme => ({
  title,
  mrAuto,
  mlAuto,
  ...checkboxes,
  ...buttonGroup,
  ...tooltips,
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    display: 'flex',
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
    display: "flex",
    justifyContent : "space-around",
    alignItems : "center",
    alignContent: "space-around",
  },
  space50: {
    height: "50px",
    display: "block"
  },
  padding0: {
    padding: "0 !important"
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    "& img": {
      width: "100%"
    }
  },
  description: {
    maxWidth: "150px"
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em"
  },
  tdNameAnchor: {
    color: grayColor[1]
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300"
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "150px",
    fontWeight: "300",
    fontSize: "1.125em !important"
  },
  tdNumberSmall: {
    marginRight: "3px"
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0"
    },
    "& svg": {
      marginRight: "0"
    }
  },
  customFont: {
    fontSize: "16px !important"
  },
  actionButton: {
    margin: "0px",
    padding: "5px"
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  floatRight: {
    float: "right"
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  signInButton: {
    "& button": {
      marginRight: "5px"
    }
  },
  cardWrap: {
    minHeight: '170px',
  },
  iconContainerMainTitle:{
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: '18px',
    marginBottom:'2px',
  },
  iconContainerSubTitle:{
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgb(90,92,103)',
    lineHeight: '14px',
  },
  iconContainerSecond: {
      width:'48px',
      height:'48px',
      backgroundColor:'#353848',
      borderRadius:'8px',
      color:'#FF2D82',
      fontSize:'22px',
  },
  iconContainerPrimary: {
    width:'48px',
    height:'48px',
    backgroundColor:'#FF2D82',
    borderRadius:'8px',
    color:'#fff',
    fontSize:'22px',
    },
    accordionMargin:{
        backgroundColor:'#2C3040',
        margin:'16px 0',
        color:'#fff',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
    },
    sliderDetailContainer:{
    },
    showDetail:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        width:'100%',
        height: '56px',
        background: '#353848',
        borderRadius: '12px',
        fontWeight: '600',
    },
    depositedBalanceSliderRoot:{
        color:'#FF2D82',
    },
    depositedBalanceSliderMarkLabel:{
        color:'#FF2D82',
    },
    drawSliderRoot:{
        color:'#635AFF',
    },
    drawSliderMarkLabel:{
        color:'#635AFF',
    },
    depositedBalanceSliderRail:{
        opacity:'1',
        color:'#353848',
    },
    depositedBalanceSliderMark:{
        height:'0'
    },
    showDetailLeft:{
        fontSize: '18px',
        color: '#FFFFFF',
        lineHeight: '24px',
    },
    showDetailRight:{
        fontSize: '12px',
        color: '#FFFFFF',
        lineHeight: '18px',
    },
    MuiSliderRoot:{
        color: '#FF2D82',
    },
    showDetailButtonCon:{
        display:'flex',
        justifyContent:'space-around',
    },
});

export default sectionPoolsStyle;
