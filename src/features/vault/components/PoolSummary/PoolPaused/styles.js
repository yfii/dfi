const styles = (theme) => ({
  container: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  texts: {
    padding: '5px 10px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  launchpool: {
    color: '#ffffff',
    backgroundColor: theme.palette.type === 'dark' ? '#3e754e' : '#5a8f69',
  },
});

export default styles;
