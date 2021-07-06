const styles = theme => ({
  divider: {
    padding: '0',
    margin: '0 0 6px 0',
    minHeight: 0,
  },
  helpLink: {
    fontWeight: '600',
    color: theme.palette.text.primary,
    lineHeight: '14px',
    letterSpacing: 0,
    '&:hover,&:focus': {
      color: theme.palette.text.secondary,
    },
  },
  dropdownMenu: {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.background.primary,
    },
  },
});

export default styles;
