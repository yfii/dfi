import {
  title,
  mrAuto,
  mlAuto,
  primaryColor,
  hoverColor,
  grayColor,
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
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: '20px',
    marginBottom:'8px',
  },
  iconContainerSubTitle:{
    fontSize: '14px',
    fontWeight: '400',
    color: 'rgba(255,255,255,.4)',
    lineHeight: '14px',
  },
  iconContainerSecond: {
      width:'48px',
      height:'48px',
      backgroundColor:'#353848',
      borderRadius:'8px',
      color:primaryColor[0],
      
      "& i": {
        fontSize: '24px',
      },
      "&:hover,&:focus": {
        backgroundColor: hoverColor[1],
      }
  },
  iconContainerPrimary: {
      width:'48px',
      height:'48px',
      backgroundColor:primaryColor[0],
      borderRadius:'8px',
      color:'#fff',
      "& i": {
        fontSize: '24px',
      },
      "&:hover,&:focus": {
        background: hoverColor[0],
      }
  },
    accordionMargin:{
        backgroundColor:'#2C3040',
        margin:'24px 0',
        color:'#fff',
        boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.06)',
        borderRadius: '8px',
    },
    details:{
      padding: '12px 0',
      background: '#2C3040',
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.06)',
      borderRadius: '8px',
    },
    track: {
          height: 4,
          borderRadius: 2,
        },
    sliderDetailContainer:{
      padding: '24px 16px',
    },
    showDetail:{
        display:'inline-block',
        alignItems:'center',
        justifyContent:'space-around',
        width:'100%',
        height: '56px',
        background: '#353848',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '18px',
        color: '#FFFFFF',
        lineHeight: '24px',
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
    showDetailLeft:{
        float: 'left',
        margin: '16px 24px',
        fontSize: '18px',
        color: '#FFFFFF',
        lineHeight: '24px',
        fontWeight: '600',
    },
    showDetailRight:{
        float: 'right',
        fontSize: '12px',
        lineHeight: '18px',
        color: '#FFFFFF',
        opacity: '.4',
        fontWeight: '600',
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
