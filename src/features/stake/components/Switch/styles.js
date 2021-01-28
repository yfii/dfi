const green = '#34ad64';

const styles = () => ({
  container: {
    height: 30,
    position: 'relative',
    transform: 'scale(0.75)',
    width: 147,
    '& > *': {
      height: '100%',
      position: 'absolute',
      top: 0,
    },
  },
  labels: {
    alignItems: 'center',
    color: green,
    display: 'flex',
    fontSize: '1.5em',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    padding: 10,
    width: '100%',
    '& > *': {
      cursor: 'pointer',
    },
  },
  selected: {
    color: 'white',
  },
});

export default styles;
