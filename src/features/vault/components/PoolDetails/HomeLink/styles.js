const styles = theme => ({
  link: {
    display: 'inline-block',
    marginBottom: '24px',
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  linkIcon: {
    marginRight: '0.5rem',
  },
});

export default styles;
