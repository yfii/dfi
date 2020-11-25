import { defaultFont, container, grayColor } from 'assets/jss/material-kit-pro-react.js';

const styles = {
  root: {
    ...defaultFont,
    position: 'relative',
    padding: '20px 15px',
    lineHeight: '20px',
    marginBottom: '20px',
    fontSize: '14px',
    backgroundColor: 'white',
    color: grayColor[15],
    borderRadius: '3px',
    maxWidth: '100%',
    minWidth: 'auto',
  },

  message: {
    padding: '0',
    display: 'block',
    maxWidth: '89%',
  },
  close: {
    width: '20px',
    height: '20px',
  },
  iconButton: {
    width: '24px',
    height: '24px',
    float: 'right',
    fontSize: '1.5rem',
    fontWeight: '500',
    lineHeight: '1',
    position: 'absolute',
    right: '-4px',
    top: '0',
    padding: '0',
  },
  icon: {
    display: 'block',
    float: 'left',
    marginRight: '1.071rem',
  },
  container: {
    ...container,
    position: 'relative',
  },
};

export default styles;
