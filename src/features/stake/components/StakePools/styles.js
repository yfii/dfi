const styles = () => ({
  banner: {
    width: '100%',
  },
  poweredByBeefy: {
    fontWeight: 'bold',
    margin: '10px 0',
    padding: '0 20px',
    textAlign: 'right',
  },
  switch: {
    margin: '20px auto 50px',
  },
  pools: {
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    '& img': {
      display: 'block',
      margin: '0 auto',
    },
  },
  barn: {
    marginTop: 100,
    '& img' : {
      width: '70%',
    }
  },
  projects: {
    margin: '50px 0',
    '& img' : {
      width: '50%',
    }
  },
  links: {
    display: 'flex',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    marginTop: 50,
    textTransform: 'uppercase',
    '& a': {
      color: 'inherit',
    },
  },
});

export default styles;
