import { container, whiteColor } from 'assets/jss/material-kit-pro-react.js';

const vaultPageStyle = theme => ({
  page: {
    backgroundColor: whiteColor,
    minHeight: '100vh',
  },
  container: {
    ...container,
    zIndex: 1,
  },
});

export default vaultPageStyle;
