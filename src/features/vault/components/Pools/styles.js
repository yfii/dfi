const secondStyle = {
  opacity: '0.4',
  fontFamily: 'Helvetica',
  fontSize: '14px',
  color: '#FFFFFF',
  letterSpacing: '0',
  lineHeight: '14px',
};

const styles = theme => ({
  container: {
    paddingTop: '4px',
  },
  mainTitle: {
    fontFamily: 'Helvetica',
    fontSize: '32px',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
  },
  secondTitle: {
    ...secondStyle,
    fontWeight: '550',
    color: '#000',
  },
});

export default styles;
