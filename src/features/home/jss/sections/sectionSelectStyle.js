import { whiteColor, grayColor } from "assets/jss/material-kit-pro-react.js";

const sectionSelectStyle = theme => ({
  modalRoot: {
    overflow: "auto",
    display: "block"
  },
  modal: {
    [theme.breakpoints.up("sm")]: {
      maxWidth: "500px",
      margin: "auto"
    },
    borderRadius: "6px",
    overflow: "visible",
    maxHeight: "unset",
    width: "100%",
    marginTop: "130px !important",
    maxWidth: "50vh",
  },

  modalTitle: {
    margin: "0",
    lineHeight: "1.5"
  },
  modalCloseButton: {
    "&, &:hover": {
      color: grayColor[0]
    },
    "&:hover": {
      opacity: "1"
    },
    cursor: "pointer",
    padding: "1rem",
    margin: "-1rem -1rem -1rem auto",
    backgroundColor: "transparent",
    border: "0",
    WebkitAppearance: "none",
    float: "right",
    fontSize: "1.5rem",
    fontWeight: "500",
    lineHeight: "1",
    textShadow: "0 1px 0 " + whiteColor,
    opacity: ".5"
  },
  modalClose: {
    width: "16px",
    height: "16px"
  },
  modalBody: {
    // paddingTop: "24px",
    // paddingRight: "24px",
    // paddingBottom: "16px",
    // paddingLeft: "24px",
    position: "relative",
    overflow: "visible"
  },
  modalFooter: {
    padding: "15px",
    textAlign: "right",
    paddingTop: "0",
    margin: "0"
  },
  modalFooterCenter: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  instructionNoticeModal: {
    marginBottom: "25px"
  },
  imageNoticeModal: {
    maxWidth: "150px"
  },
  modalLarge: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "800px"
    }
  },
  modalSmall: {
    [theme.breakpoints.up("sm")]: {
      width: "300px",
      margin: "auto"
    },
    margin: "0 auto"
  },
  modalSmallBody: {
    marginTop: "20px"
  },
  root: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    }
  },
  card: {
    flex: '1',
    height: '25vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    borderRadius: '0px',
    transition: 'background-color 0.2s linear',
    [theme.breakpoints.up('sm')]: {
      // height: '100vh',
      minWidth: '20%',
      minHeight: '50vh',
    }
  },
  
  pool: {
    backgroundColor: whiteColor,
    '&:hover': {
      backgroundColor: "#e56b73",
      '& .title': {
        color: whiteColor,
        // display: 'none'
      },
      // '& .soon': {
      //   color: whiteColor,
      //   display: 'block'
      // },
      '& .icon': {
        color: whiteColor
      }
    },
    '& .title': {
      color: "#e56b73",
    },
    // '& .soon': {
    //   color: "#e56b73",
    //   display: 'none'
    // },
    '& .icon': {
      color: "#e56b73"
    },
  },
  title: {
    padding: '24px',
    paddingBottom: '0px',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: '24px'
    }
  },
  icon: {
    fontSize: '60px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '100px',
    }
  },
  link: {
    textDecoration: 'none'
  }
});

export default sectionSelectStyle;
