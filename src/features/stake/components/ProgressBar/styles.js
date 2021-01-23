const lightGreen = '#afddc4';
const green = '#34ad64';

const progressBarHeight = 10;
const progressBar = {
  borderRadius: progressBarHeight / 2,
  height: progressBarHeight,
};

const styles = () => ({
  background: {
    ...progressBar,
    backgroundColor: lightGreen,
    position: 'relative',
    width: '100%',
  },
  foreground: {
    ...progressBar,
    backgroundColor: green,
    left: 0,
    position: 'absolute',
    top: 0,
  },
});

export default styles;
