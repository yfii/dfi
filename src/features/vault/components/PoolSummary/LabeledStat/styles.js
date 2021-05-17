const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: props => (props.align ? props.align : 'center'),
    justifyContent: 'center',
  },
  stat: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    lineHeight: '18px',
    letterSpacing: 0,
    position: 'relative',
  },
  substat: {
    fontSize: '16px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    top: '-20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
    lineHeight: '14px',
    letterSpacing: 0,
  },
  boosted: {
    color: '#2a9e46',
    position: 'absolute',
    top: '-20px',
  },
  crossed: {
    textDecoration: 'line-through',
  },
});

export default styles;
