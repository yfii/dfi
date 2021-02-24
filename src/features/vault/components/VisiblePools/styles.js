const styles = theme => ({
  scroller: {
    width: '100%',
  },
  subtitle: {
    fontSize: '20px',
    letterSpacing: '0',
    lineHeight: '8px',
    [theme.breakpoints.down('xs')]: {
      lineHeight: '16px',
    },
    fontWeight: '550',
    color: theme.palette.text.primary,
  },
});

export default styles;
