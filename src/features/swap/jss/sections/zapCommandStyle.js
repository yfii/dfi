import {
    defaultFont,
  } from "assets/jss/material-kit-pro-react.js";

const secondStyle = {
    opacity: '0.4',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    color: '#FFFFFF',
    letterSpacing: '0',
    lineHeight: '14px',
};

const zapCommandStyle = theme => ({
    container:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
    },
    zapContainer:{
        width:'588px',
        height:'602px',
        backgroundColor:'#2C3040',
        borderRadius:'24px',
        padding:'24px',
        
    },
    mainTitle:{
        fontFamily: 'Helvetica',
        fontSize: '32px',
        color: '#FFFFFF',
        letterSpacing: '0',
        lineHeight: '32px',
        fontWeight: "550",
    },
    secondTitle:{
        ...secondStyle,
        fontWeight: "550",
    },
    secondContent:{
        ...secondStyle,
    },
    boxContainer:{
        padding:'15px',
        border: '1px solid #353848',
        borderRadius: '16px',
    },
    boxHeader:{
        display:'flex',
        justifyContent:'space-between',
        ...secondStyle,
    },
    boxHeaderMain:{
        fontSize: '18px',
        lineHeight: '18px',
        fontWeight: "550",
    },
    boxHeaderSub:{
        fontSize: '12px',
        textAlign: 'right',
        lineHeight: '18px',
        fontWeight: "400",
    },
    boxContainerInside:{
        borderRadius: '12px',
        background: '#635AFF',
        borderRadius: '24px',
    },
    endAdornment:{
        display:'flex',
    },
    memuStyle:{
        display:'flex',
        alignItems:'center',
    },
    marginRight:{
        marginRight:'4px',
    },
    navLink:{
        padding:'0',
        paddingLeft:'4px',
    }
})

export default zapCommandStyle;