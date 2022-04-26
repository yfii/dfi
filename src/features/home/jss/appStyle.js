import { container } from 'assets/jss/material-kit-pro-react.js';

const appStyle = theme => ({
  '@global': {
    'html,body': {
      backgroundColor: theme.palette.background.default,
    },
    '#WEB3_CONNECT_MODAL_ID': {
      position: 'relative',
      zIndex: 2100,
    },
  },
  page: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  container: {
    ...container,
    zIndex: 1,
  },
  children: {
    minHeight: '77vh',
  },
});

export default appStyle;
