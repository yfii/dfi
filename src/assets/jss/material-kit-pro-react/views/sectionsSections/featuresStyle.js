import {
  container,
  mlAuto,
  mrAuto,
  title,
  description,
  blackColor,
  whiteColor,
  hexToRgb,
} from 'assets/jss/material-kit-pro-react.js';

const features = {
  container,
  mlAuto,
  mrAuto,
  title,
  description,
  features1: {
    textAlign: 'center',
    padding: '80px 0',
  },
  features2: {
    padding: '80px 0',
  },
  features3: {
    padding: '80px 0',
    '& $phoneContainer': {
      maxWidth: '220px',
      margin: '0 auto',
    },
  },
  features4: {
    padding: '80px 0',
    '& $phoneContainer': {
      maxWidth: '260px',
      margin: '60px auto 0',
    },
  },
  features5: {
    padding: '80px 0',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    '& $title': {
      marginBottom: '30px',
    },
    '& $title,& $container': {
      position: 'relative',
      zIndex: '2',
      color: whiteColor,
    },
    '&:after': {
      background: 'rgba(' + hexToRgb(blackColor) + ',0.55)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      content: "''",
      zIndex: '0',
      left: '0px',
      top: '0px',
    },
  },
  textCenter: {
    textAlign: 'center',
  },
  phoneContainer: {
    '& img': {
      width: '100%',
    },
  },
};

export default features;
