const styles = theme => ({
  boosts: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
    padding: '5px 10px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  link: {
    color: theme.palette.primary.main,
  },
  dialogContent: {
    padding: 0,
  },
});

export default styles;
