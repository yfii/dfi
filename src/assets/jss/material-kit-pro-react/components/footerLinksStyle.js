import {
    mlAuto,
    container
  } from "assets/jss/material-kit-pro-react.js";
  
  import tooltip from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const footerLinksStyle = theme => ({
    container:{
        ...container,
        marginTop:'10px',
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
        color: "inherit",
        position: "relative",
        padding: "0.9375rem",
        fontWeight: "400",
        fontSize: "12px",
        textTransform: "uppercase",
        lineHeight: "20px",
        textDecoration: "none",
        margin: "0px",
        display: "inline-flex",
        "&:hover,&:focus": {
          color: "inherit"
        },
        [theme.breakpoints.down("sm")]: {
          width: "calc(100% - 30px)",
          marginLeft: "15px",
          marginBottom: "8px",
          marginTop: "8px",
          textAlign: "left",
          "& > span:first-child": {
            justifyContent: "flex-start"
          }
        },
        "& svg": {
          marginRight: "3px",
          width: "20px",
          height: "20px"
        }
      },
    navLinkJustIcon: {
        "& .fab,& .far,& .fal,& .fas,& .material-icons": {
          marginRight: "0px"
        },
        "& svg": {
          marginRight: "0px"
        }
    },
    socialIcons: {
        position: "relative",
        fontSize: "1.25rem",
        // maxWidth: "44px"
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
})

export default footerLinksStyle;