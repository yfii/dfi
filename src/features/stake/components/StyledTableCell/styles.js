const fontDefaultStyle = {
  color: '#fff',
  fontFamily: 'Helvetica',
  fontSize: '18px',
  letterSpacing: '0',
  lineHeight: '18px',
  fontWeight:'400',
};

const styles = theme => ({
  head: {
    ...fontDefaultStyle,
    backgroundColor: '#635AFF',
    height:'48px',
    borderColor:'rgb(40,42,55,0.5)',
    padding:'0 40px',
    '&:first-child':{
      borderTopLeftRadius:'12px',
    },
    '&:last-child':{
      borderTopRightRadius:'12px',
    },
  },
  body: {
    ...fontDefaultStyle,
    padding:'20px 40px',
    backgroundColor: '#2C3040',
    borderColor:'rgb(40,42,55,0.5)',
  },
});

export default styles;
