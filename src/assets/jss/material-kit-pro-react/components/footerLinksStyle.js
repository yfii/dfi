import {
    mlAuto,
    container,
    primaryColor,
    hoverColor
  } from "assets/jss/material-kit-pro-react.js";
  
  import tooltip from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

  

const footerLinksStyle = theme => ({
    container:{
        ...container,
        padding:'32px 0 32px 0',
        borderTop: '1px solid rgba(255, 255, 255, .04)',
        textAlign: 'center',
    },
    fixed:{
        position:'fixed',
        bottom:'0',
        left:'0',
        right:'0',
        margin:'auto',
    },
    list: {
        [theme.breakpoints.up("md")]: {
          WebkitBoxAlign: "center",
          MsFlexAlign: "center",
          alignItems: "center",
          WebkitBoxOrient: "horizontal",
          WebkitBoxDirection: "normal",
          MsFlexDirection: "row",
          flexDirection: "row"
        },
        marginTop: "0px",
        display: "flex",
        justifyContent:'center',
        paddingLeft: "0",
        marginBottom: "0",
        listStyle: "none",
        padding: "0",
    },

    listItem:{
        float: "left",
        color: "inherit",
        position: "relative",
        display: "block",
        width: "auto",
    },
    navLink: {
        background: primaryColor[0],
        position: "relative",
        padding: "0.9375rem",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
          background: hoverColor[0],
        },
        [theme.breakpoints.down("sm")]: {
          marginLeft: "0px",
          marginBottom: "8px",
          marginTop: "8px",
          textAlign: "left",
        },
        "& svg": {
          marginRight: "3px",
          width: "20px",
          height: "20px"
        },
        "& i": {
          position: 'absolute',
        },
      },
    navLinkJustIcon: {
        "& .fab,& .far,& .fal,& .fas,& .material-icons": {
          marginRight: "0px"
        },
        "& svg": {
          marginRight: "0px"
        },

    },
    socialIcons: {
        position: "relative",
        fontSize: "1.25rem",
        maxWidth: "44px"
    },
    ...tooltip,
    marginRight5: {
        marginRight: "5px"
    },
    mlAuto,
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    extraContent: {
        color:primaryColor[0],
        fontWeight: "400",
        'a&:hover, a&:focus':{
          color:hoverColor[0],
        },
        'a:visited': {
          color:primaryColor[0],
        },
    },
    linkList: {
      margin:'24px 80px',
      [theme.breakpoints.down("xs")]: {
        margin:'0'
      },
    },
    linkItem: {
      whiteSpace:'nowrap',
    },

})

export default footerLinksStyle;