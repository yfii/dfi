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
        marginBottom:'24px',
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
    subMemuStyle:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    papperNav:{
        width:'100%',
    },
    marginRight:{
        marginRight:'4px',
    },
    receiveStyle:{
        display:'flex',
        justifyContent:'space-between',
        width:'100%',
        height: '56px',
        background: '#353848',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '18px',
        color: '#FFFFFF',
        lineHeight: '24px',
        fontWeight: '600',
        boxShadow:'0 2px 2px 0 #353848',
        textAlign:'right',
        padding:'18.5px 18px',
        '&:hover,&:focus':{
            background: '#353848',
            boxShadow:'0 2px 2px 0 #353848',
        }
    },
    navLink:{
        paddingLeft:'4px',
        paddingRight:'4px',
    },
    avatar:{
        width:'24px',
        height:'24px',
        lineHeight:'48px',
    },
    avatarFont:{
        ...secondStyle,
        opacity: '1',
        fontSize: '16px',
        textAlign: 'center',
        lineHeight: '16px',
    },
    maxButtonBox:{
        display:'flex',
        alignItems:'center',
    },
    maxButton:{
        ...secondStyle,
        opacity: '1',
        width:'48px',
        height:'24px',
        backgroundColor: '#635AFF',
        borderRadius: '24px',
        fontSize: '12px',
        lineHeight: '12px',
        padding:'12px 24px',
        marginRight:'8px',
        "&:hover,&:focus": {
            backgroundColor: "#635AFF",
        }
    }
})

export default zapCommandStyle;