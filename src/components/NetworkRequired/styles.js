const styles = theme => ({
  common: {
    padding: 20,
    color: theme.palette.primary.main,
    textAlign: 'center',
    width: '100%',
    '& > :last-child': {
      marginBottom: 0,
    },
  },
  contained: {
    backgroundColor: theme.palette.background.primary,
    border: `1px solid ${theme.palette.background.border}`,
    borderRadius: '8px',
    marginBottom: 25,
    color: theme.palette.primary.main,
    width: '100%',
    '& > :last-child': {
      marginBottom: 0,
    },
  },
  inline: {},
});

export default styles;
