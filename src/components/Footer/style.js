import { mlAuto, container, primaryColor, hoverColor } from 'assets/jss/material-kit-pro-react.js';

import tooltip from 'assets/jss/material-kit-pro-react/tooltipsStyle.js';

const footerStyle = theme => ({
  container: {
    ...container,
    padding: '32px 0',
    textAlign: 'center',
  },
  list: {
    [theme.breakpoints.up('md')]: {
      WebkitBoxAlign: 'center',
      MsFlexAlign: 'center',
      alignItems: 'center',
      WebkitBoxOrient: 'horizontal',
      WebkitBoxDirection: 'normal',
      MsFlexDirection: 'row',
      flexDirection: 'row',
    },
    marginTop: '0px',
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    float: 'left',
    color: 'inherit',
    position: 'relative',
    display: 'block',
    width: 'auto',
  },
  navLink: {
    background: primaryColor[0],
    position: 'relative',
    padding: '15px',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    '&:hover,&:focus': {
      background: hoverColor[0],
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      marginBottom: '8px',
      marginTop: '8px',
      textAlign: 'left',
    },
  },
  socialIcons: {
    position: 'relative',
    fontSize: '1.25rem',
    maxWidth: '45px',
    '& > path': {
      color: '#fff',
    },
  },
  linkList: {
    margin: '24px 80px',
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },
  },
});

export default footerStyle;
