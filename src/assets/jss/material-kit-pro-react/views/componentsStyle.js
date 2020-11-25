import {
  container,
  main,
  mainRaised,
  title,
  whiteColor,
  grayColor,
  section,
  hexToRgb,
} from 'assets/jss/material-kit-pro-react.js';

const componentsStyle = {
  main,
  mainRaised,
  container: {
    ...container,
    zIndex: '2',
    position: 'relative',
  },
  brand: {
    color: whiteColor,
    textAlign: 'center',
    '& h1': {
      fontSize: '4.2rem',
      fontWeight: '600',
      display: 'inline-block',
      position: 'relative',
    },
    '& h3': {
      fontSize: '1.313rem',
      maxWidth: '500px',
      margin: '10px auto 0',
    },
  },
  title: {
    ...title,
    color: whiteColor + '  !important',
  },
  link: {
    textDecoration: 'none',
  },
  textCenter: {
    textAlign: 'center',
  },
  section: {
    ...section,
    padding: '70px 0px',
  },
  sectionGray: {
    background: grayColor[14],
  },
  block: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '500',
    fontSize: '12px',
    textTransform: 'uppercase',
    borderRadius: '3px',
    textDecoration: 'none',
    position: 'relative',
    display: 'block',
  },
  inlineBlock: {
    display: 'inline-block',
    padding: '0px',
    width: 'auto',
  },
  list: {
    marginBottom: '0',
    padding: '0',
    marginTop: '0',
  },
  left: {
    float: 'left!important',
    display: 'block',
  },
  right: {
    padding: '15px 0',
    margin: '0',
    float: 'right',
  },
  icon: {
    width: '18px',
    height: '18px',
    top: '3px',
    position: 'relative',
  },
};

export default componentsStyle;
