const styles = (theme) => ({
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
  },
  label: {
    fontSize: '14px',
    fontWeight: '400',
    color: theme.palette.text.secondary,
    lineHeight: '14px',
    letterSpacing: 0,
  },
});

export default styles;
