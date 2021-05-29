import {
  blackColor,
  boxShadow,
  containerFluid,
  dangerColor,
  grayColor,
  hexToRgb,
  infoColor,
  primaryColor,
  roseColor,
  successColor,
  transition,
  warningColor,
  whiteColor,
} from 'assets/jss/material-kit-pro-react.js';

const styles = theme => ({
  appBar: {
    display: 'flex',
    border: '0',
    borderRadius: '3px',
    padding: '0.625rem 0',
    marginBottom: '20px',
    color: grayColor[15],
    width: '100%',
    backgroundColor: whiteColor,
    boxShadow:
      '0 4px 18px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.12), 0 7px 10px -5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.15)',
    transition: 'all 150ms ease 0s',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
    top: 'auto',
  },
  fixed: {
    position: 'fixed',
  },
  container: {
    ...containerFluid,
    minHeight: '50px',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'nowrap',
    '@media (min-width: 1230px)': {
      width: '1230px',
      maxWidth: '100%',
    },
  },
  title: {
    letterSpacing: 'unset',
    '&,& a': {
      minWidth: 'unset',
      lineHeight: '28px',
      fontSize: '24px',
      fontWeight: '700',
      borderRadius: '3px',
      textTransform: 'none',
      whiteSpace: 'nowrap',
      color: theme.palette.text.primary,
      alignItems: 'flex-end',
      '&:hover,&:focus': {
        color: 'inherit',
        background: 'transparent',
      },
    },
    '& a': {
      marginLeft: '8px',
    },
  },
  appResponsive: {
    margin: '20px 10px',
    marginTop: '0px',
  },
  primary: {
    backgroundColor: primaryColor[0],
    color: whiteColor,
    boxShadow:
      '0 4px 20px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 7px 12px -5px rgba(' +
      hexToRgb(primaryColor[0]) +
      ', 0.46)',
  },
  info: {
    backgroundColor: infoColor[0],
    color: whiteColor,
    boxShadow:
      '0 4px 20px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 7px 12px -5px rgba(' +
      hexToRgb(infoColor[0]) +
      ', 0.46)',
  },
  success: {
    backgroundColor: successColor[0],
    color: whiteColor,
    boxShadow:
      '0 4px 20px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 7px 12px -5px rgba(' +
      hexToRgb(successColor[0]) +
      ', 0.46)',
  },
  warning: {
    backgroundColor: warningColor[0],
    color: whiteColor,
    boxShadow:
      '0 4px 20px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 7px 12px -5px rgba(' +
      hexToRgb(warningColor[0]) +
      ', 0.46)',
  },
  danger: {
    backgroundColor: dangerColor[0],
    color: whiteColor,
    boxShadow:
      '0 4px 20px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 7px 12px -5px rgba(' +
      hexToRgb(dangerColor[0]) +
      ', 0.46)',
  },
  rose: {
    backgroundColor: roseColor[0],
    color: whiteColor,
    boxShadow:
      '0 4px 20px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.14), 0 7px 12px -5px rgba(' +
      hexToRgb(roseColor[0]) +
      ', 0.46)',
  },
  transparent: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
    paddingTop: '25px',
    color: whiteColor,
  },
  dark: {
    color: whiteColor,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 0px',
  },
  white: {
    border: '0',
    padding: '0.625rem 0',
    marginBottom: '20px',
    color: grayColor[15],
    backgroundColor: whiteColor + ' !important',
    boxShadow:
      '0 4px 18px 0px rgba(' +
      hexToRgb(blackColor) +
      ', 0.12), 0 7px 10px -5px rgba(' +
      hexToRgb(blackColor) +
      ', 0.15)',
  },
  drawerPaper: {
    border: 'none',
    bottom: '0',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    width: 260,
    ...boxShadow,
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    right: '0',
    left: 'auto',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
    ...transition,
  },
  hidden: {
    width: '100%',
  },
  collapse: {
    [theme.breakpoints.up('md')]: {
      display: 'flex !important',
      MsFlexPreferredSize: 'auto',
      flexBasis: 'auto',
    },
    WebkitBoxFlex: '1',
    MsFlexPositive: '1',
    flexGrow: '1',
    WebkitBoxAlign: 'center',
    MsFlexAlign: 'center',
    alignItems: 'center',
  },
  closeButtonDrawer: {
    position: 'absolute',
    right: '8px',
    top: '9px',
    zIndex: '1',
  },
  tabs: {
    width: '60xh',
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  logo: {
    marginRight: '12px',
  },
  middleNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    display: 'inline-flex',
    margin: '0 1rem',
    fontSize: '1rem',
    fontWeight: 400,
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
    '& span': {
      color: theme.palette.text.primary,
    },
  },
  icon: {
    color: theme.palette.text.primary,
    marginRight: '0.5rem',
    minWidth: '24px',
    textAlign: 'end',
  },
  iconButton: {
    color: theme.palette.text.primary,
  },
  btnBoost: {
    marginLeft: '10px',
    marginRight: '5px',
    padding: '3px 4px',
    border: `solid 2px ${successColor[1]}`,
    borderRadius: '4px',
    '& img': {
      verticalAlign: 'middle',
      height: '15px',
    },
    '&:hover': {
      backgroundColor: successColor[1],
    },
    '&:hover img': {
      filter:
        'invert(100%) sepia(100%) saturate(0%) hue-rotate(288deg) brightness(1000%) contrast(1000%)',
    },
  },
});

export default styles;
