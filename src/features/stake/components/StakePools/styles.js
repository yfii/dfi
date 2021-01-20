const fontDefaultStyle = {
  color: '#fff',
  fontFamily: 'Helvetica',
  fontSize: '18px',
  letterSpacing: '0',
  lineHeight: '18px',
  fontWeight: '400',
};

const normalBackgroundColor = '#2C3040';
const primaryColor = '#FF2D82';
const secondColor = '#635AFF';

const styles = () => ({
  mainTitle: {
    fontFamily: 'Helvetica',
    fontSize: '32px',
    color: '#FFFFFF',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: '550',
  },
  secondTitle: {
    opacity: '0.4',
    fontFamily: 'Helvetica',
    fontSize: '14px',
    color: '#FFFFFF',
    letterSpacing: '0',
    lineHeight: '14px',
    fontWeight: '550',
  },
  listHeader: {
    backgroundColor: normalBackgroundColor,
    position: 'relative',
    borderRadius: '6px',
    height: '180px',
    padding: '48px 60px',
    zIndex: '10',
    marginBottom: '40px',
  },
  table: {
    minWidth: 700,
  },
  tableBodyRoot: {
    '& tr:last-child td:first-child': {
        borderBottomLeftRadius: '12px',
    },
    '& tr:last-child td:last-child': {
        borderBottomRightRadius: '12px',
    },
  },
  stakeButton: {
    ...fontDefaultStyle,
    backgroundColor: primaryColor,
    borderRadius: '24px',
    fontSize: '14px',
    lineHeight: '14px',
    padding: '12px 24px',
    marginRight: '8px',
    boxShadow: '0 0',
    '&:hover, &:focus': {
      backgroundColor: primaryColor,
      boxShadow: '0 0',
    }
  },
  learnMoreButton: {
    ...fontDefaultStyle,
    height: '32px',
    borderRadius: '24px',
    fontSize: '12px',
    lineHeight: '12x',
    padding: '12px 24px',
    marginLeft: '12px',
    fontWeight: '600',
    boxShadow: '0 0',
    backgroundColor: secondColor,
    '&:hover, &:focus': {
      backgroundColor: secondColor,
    }
  },
  firstCell: {
    display: 'flex',
  },
  firstCellContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '8px',
    '& :first-child': {
        marginBottom: '4px'
    }
  },
  avatarContainer: {
    width: '48px',
    height: '48px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '38px',
    height: '38px',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
  },
  marginTop: {
    marginTop: '12px',
  },
  mobileContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: normalBackgroundColor,
  },
  mobileHead: {
    ...fontDefaultStyle,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '12px',
  },
  mobileDetail: {
    fontFamily: 'Helvetica',
    fontSize: '16px',
    color: '#A4A6B3',
    letterSpacing: '0',
    lineHeight: '14px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '18px',
  },
  mobileAvatarContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '40px',
  },
  mobileAvatar: {
    width: '54px',
    height: '54px',
  },
  mobileStakeButton: {
    width: '180px',
    height: '44px',
  },
})

export default styles;
