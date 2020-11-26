import { primaryColor } from 'assets/jss/material-kit-pro-react.js';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: props => (props.align ? props.align : 'center'),
  },
  stat: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: primaryColor[0],
    lineHeight: '18px',
    letterSpacing: 0,
  },
  label: {
    fontSize: '14px',
    fontWeight: '400',
    color: primaryColor[0],
    lineHeight: '14px',
    opacity: '0.4',
    letterSpacing: 0,
  },
};

export default styles;
