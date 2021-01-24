const green = '#34ad64';

const inputPadding = 20;
const inputBackground = {
  backgroundColor: '#f4f4f4',
  borderRadius: 40,
};

const styles = theme => ({
  backdrop: {
    backgroundColor: 'rgba(52, 173, 100, 0.33)',
  },
  paper: {
    borderRadius: 20,
    padding: '75px 50px',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 25,
      paddingRight: 25,
    },
  },
  label: {
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    ...inputBackground,
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'nowrap',
    fontWeight: 'bold',
    margin: '5px 0 40px',
    paddingRight: inputPadding,
  },
  input: {
    ...inputBackground,
    border: 'none',
    fontSize: 'inherit',
    fontWeight: 'bold',
    padding: inputPadding,
    paddingRight: 5,
  },
  inputSymbol: {
    paddingRight: 5,
  },
  maxButton: {
    backgroundColor: green,
  },
  maxButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    '& > *': {
      fontWeight: 'bold',
      margin: '0 20px',
    },
  },
  cancelButton: {
    borderColor: green,
  },
  cancelButtonLabel: {
    color: green,
  },
  stakingButton: {
    backgroundColor: green,
  },
  stakingButtonLabel: {
    color: 'white',
  },
});

export default styles;
