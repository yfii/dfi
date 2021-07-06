const styles = theme => ({
  notice: {
    backgroundColor: theme.palette.background.secondary,
    padding: 25,
    marginBottom: 25,
    textAlign: 'center',
    color: theme.palette.primary.main,
    '& > :last-child': {
      marginBottom: 0,
    },
  },
  message: {
    marginBottom: 15,
  },
  actions: {
    margin: '-10px -10px 15px 0',
  },
  button: {
    border: '1px solid ' + theme.palette.background.border,
    padding: '4px 8px',
    backgroundColor: theme.palette.background.default,
    textTransform: 'none',
    margin: '10px 10px 0 0',
  },
  note: {
    marginBottom: 15,
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
  },
});

export default styles;
