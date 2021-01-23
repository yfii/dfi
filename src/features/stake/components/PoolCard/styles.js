const styles = () => ({
  card: {
    position: 'relative',
  },
  background: {
    width: '100%',
  },
  foreground: {
    height: '100%',
    left: 0,
    padding: '38% 15% 0',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  stakeButtons: {
    alignItems: 'center',
    display: 'flex',
    height: '38%',
    justifyContent: 'flex-end',
  },
  button: {
    height: 34,
    '& + &': {
      marginLeft: 20,
    },
  },
  text: {
    fontWeight: 'bold',
  },
  percentageBar: {
    margin: '10px 0',
  },
  percentage: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default styles;
