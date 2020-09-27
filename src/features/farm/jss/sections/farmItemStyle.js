const farmItemStyle = theme => ({
  flexColumnCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  farmItem: {
    minWidth: 260,
    margin: '50px 10px',
    padding: 15,
    borderRadius: 20,

    color: '#ffffff',
    textAlign: 'center'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center'
  },
  logoImage: {
    width: 60,
    height: 60,
    zIndex: 1
  },
  weightFont: {
    fontSize: 20,
    fontWeight: 500
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  menuButton: {
    borderRadius: 10,
    fontSize: 15,
    margin: 10
  }
});

export default farmItemStyle;
