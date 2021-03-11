const styles = theme => ({
  networkToggle: {
    display: 'inline-flex',
    borderRadius: '35px',
    backgroundColor: theme.palette.background.secondary,
    '&:hover': {
      backgroundColor: theme.palette.background.border,
      cursor: 'pointer',
    },
    padding: '0 16px 0 0',
    alignItems: 'center',
  },
  networkImg: {
    height: '40px',
  },
  networkTag: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '16px',
  },
  networkText: {
    margin: '0 0 0 8px',
    fontWeight: 'bold',
  },
  status: {
    width: '10px',
    height: '10px',
    backgroundColor: 'green', // Change
    borderRadius: '50%',
  },
});

export default styles;
