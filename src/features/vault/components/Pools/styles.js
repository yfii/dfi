const styles = theme => ({
  container: {
    paddingTop: '4px',
  },
  titles: {
    display: 'flex',
    justifyContent: 'space-between',
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
  subtitles: {
    display: 'flex',
    justifyContent: 'space-between',
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
  },
});

export default styles;
