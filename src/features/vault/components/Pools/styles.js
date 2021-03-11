const styles = theme => ({
  container: {
    paddingTop: '4px',
  },
  tvl: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
  },
  titleLoader: {
    marginLeft: '12px',
  },
  subtitle: {
    fontSize: '14px',
    letterSpacing: '0',
    lineHeight: '8px',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '16px',
    },
    fontWeight: '550',
    color: theme.palette.text.secondary,
    marginTop: '0',
  },
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
  networks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  networkProfile: {
    margin: '24px',
    textAlign: 'center',
    backgroundColor: '#FBF6F0',
    border: '1px solid #DED9D5',
    padding: '24px',
  },
  networkImgLarge: {
    height: '100px',
  },
  networkName: {},
});

export default styles;
