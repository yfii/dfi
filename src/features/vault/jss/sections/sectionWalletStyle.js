import { mlAuto } from 'assets/jss/material-kit-pro-react.js';

const sectionWalletStyle = theme => ({
  mlAuto,
  root: {
    flexGrow: 1,
  },
  walletCard: {
    borderRadius: '50rem',
    marginTop: 0,
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'rgb(233, 30, 99)',
  },
  walletTitle: {
    fontSize: '0.5rem',
    lineHeight: 1.2,
  },
  walletAddress: {
    fontSize: '0.5rem',
    lineHeight: 1.2,
  },
});

export default sectionWalletStyle;
