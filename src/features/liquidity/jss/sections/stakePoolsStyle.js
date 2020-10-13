import { withStyles } from "@material-ui/core/styles";
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const fontDefaultStyle = {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: '18px',
    letterSpacing: '0',
    lineHeight: '18px',
    fontWeight:'400',
};

const secondStyle = {
  opacity: '0.4',
  fontFamily: 'Helvetica',
  fontSize: '14px',
  color: '#FFFFFF',
  letterSpacing: '0',
  lineHeight: '14px',
};

const normalBackgroundColor = '#2C3040';
const primaryColor = '#FF2D82';
const secondColor = '#635AFF';

const StyledTableCell = withStyles((theme) => ({
  head: {
    ...fontDefaultStyle,
    backgroundColor: secondColor,
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
    backgroundColor: normalBackgroundColor,
    borderColor:'rgb(40,42,55,0.5)',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    
  },
}))(TableRow);

const stakePoolsStyle = theme => ({
  leftImage:{
    position:'absolute',
    left:'-3px',
    bottom:'-98px',
    zIndex:'-1',
  },
  rightImage:{
    position:'absolute',
    right:'0',
    bottom:'0',
    zIndex:'-1',
  },
  mainTitle:{
    fontFamily: 'Helvetica',
    fontSize: '32px',
    color: '#FFFFFF',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: "550",
  },
  secondTitle:{
      ...secondStyle,
      fontWeight: "550",
  },
  listHeader:{
    backgroundColor: normalBackgroundColor,
    position:'relative',
    borderRadius:'6px',
    height:'180px',
    padding:'48px 60px',
    zIndex:'10',
    marginBottom:'40px',
  },
  table: {
      minWidth: 700,
  },
  tableBodyRoot:{
      '& tr:last-child th:first-child':{
          borderBottomLeftRadius:'12px',
      },
      '& tr:last-child th:last-child':{
          borderBottomRightRadius:'12px',
      },
  },
  stakeButton:{
      ...fontDefaultStyle,
      backgroundColor: primaryColor,
      borderRadius: '24px',
      fontSize: '14px',
      lineHeight: '14px',
      padding:'12px 24px',
      marginRight:'8px',
      boxShadow: "0 0",
      "&:hover,&:focus": {
          backgroundColor: primaryColor,
          boxShadow: "0 0",
      }
  },
  learnMoreButton:{
    ...fontDefaultStyle,
    height:'32px',
    borderRadius: '24px',
    fontSize: '12px',
    lineHeight: '12x',
    padding:'12px 24px',
    marginLeft:'12px',
    fontWeight:'600',
    boxShadow: "0 0",
    backgroundColor: secondColor,
      "&:hover,&:focus": {
        backgroundColor: secondColor,
    }
  },
  rewardsButton:{
      backgroundColor: secondColor,
      "&:hover,&:focus": {
          backgroundColor: secondColor,
          boxShadow: "0 0",
      }
  },
  grayButton:{
      color:primaryColor,
      backgroundColor:'#353848',
      boxShadow:'0 2px 2px 0 #353848',
      boxShadow: "0 0",
      "&:hover,&:focus": {
          color:primaryColor,
          backgroundColor: '#353848',
          boxShadow: "0 0",
      }
  },
  firstCell:{
      display:'flex',
  },
  firstCellContent:{
      display:'flex',
      flexDirection:'column',
      alignItems:'flex-start',
      justifyContent:'center',
      marginLeft:'8px',
      '& :first-child':{
          marginBottom:'4px'
      }
  },
  avatarContainer:{
      width:'48px',
      height:'48px',
      borderRadius:'4px',
      backgroundColor:'#fff',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
  },
  avatar:{
      width:'38px',
      height:'38px',
  },
  inputAvatar:{
    [theme.breakpoints.down("xs")]: {
      width:'26px',
      height:'26px',
    },
  },
  detailTitle:{
    fontFamily: 'Helvetica',
    fontSize: '32px',
    color: '#FFFFFF',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: "550",
    marginBottom:'24px'
  },
  detailContentUp:{
      backgroundColor: normalBackgroundColor,
      borderTopLeftRadius:'8px',
      borderTopRightRadius:'8px',
      padding:'56px 120px',
      [theme.breakpoints.down("xs")]: {
        borderRadius:'8px',
        marginBottom:'12px',
        padding:'30px 16px',
      },
  },
  detailContentDown:{
      backgroundColor: normalBackgroundColor,
      borderBottomLeftRadius:'8px',
      borderBottomRightRadius:'8px',
      padding:'48px',
      paddingTop:'0',
      paddingBottom:'20px',
      [theme.breakpoints.down("xs")]: {
        borderRadius:'8px',
        padding:'36px 22px 12px 22px',
      },
  },
  contentTitleMarginBottom:{
      marginBottom:'48px',
      [theme.breakpoints.down("xs")]: {
        marginBottom:'0',
      },
  },
  contentTitle:{
      display:"flex",
      justifyContent:'center',
      [theme.breakpoints.down("xs")]: {
        flexDirection:'column',
      },
  },
  contentTitleItem:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      padding:'0 12px',
      [theme.breakpoints.down("xs")]: {
        alignItems:'flex-start',
      },
  },
  contentItemTitleVal:{
    ...fontDefaultStyle,
    fontSize: '28px',
    color: primaryColor,
    lineHeight: '28px',
    marginBottom:'12px',
    // textTransform:'uppercase',
    [theme.breakpoints.down("xs")]: {
      marginBottom:'0',
    }
  },
  contentItemTitle:{
    ...fontDefaultStyle,
    opacity: '0.4',
    [theme.breakpoints.down("xs")]: {
      marginBottom:'12px',
    }
  },
  stakeHintContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'10px',
    width:'85%',
    height:'36px',
    [theme.breakpoints.down("xs")]: {
      width:'100%',
      marginTop:'12px',
      height:'14px',
      marginBottom:'24px',
    },
  },
  stakeHint:{
    ...fontDefaultStyle,
    color:'#979797',
    fontSize:'14px',
  },
  stakeDetailButton:{
    width:'250px',
    height:'44px',
    marginRight:'0',
    [theme.breakpoints.down("xs")]: {
      width:'300px',
    },
  },
  stakeHintContainerHidden:{
    [theme.breakpoints.down("xs")]: {
      height:'0 !important',
      marginBottom:'0',
    }
  },
  contentTitleItemBorder:{
      borderRight:'1px solid rgb(255,255,255,0.1)',
      [theme.breakpoints.down("xs")]: {
        border:'0',
      },
  },
  contentButtonMargin:{
      marginRight:'36px',
  },
  inputContainer:{
    height:'70px',
    borderRadius:'35px',
    backgroundColor:'#353848',
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    [theme.breakpoints.down("xs")]: {
      width:'300px',
      height:'48px',
      margin:'0 auto',
    }
  },
  inputAvatarContainer:{
      width:'40px',
      height:'40px',
      borderRadius:'40px',
      backgroundColor:'#fff',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      [theme.breakpoints.down("xs")]: {
        width:'26px',
        height:'26px',
      },
  },
  flexBox:{
      display:'flex',
      alignItems:'center',
  },
  inputTxt:{
      ...fontDefaultStyle,
      marginLeft:'8px',
  },
  inputSubTxt:{
      ...fontDefaultStyle,
      fontSize: '16px',
      lineHeight: '16px',
      opacity: '0.4',
      marginRight:'8px',
  },
  inputCloseIcon:{
      color:'#fff',
      opacity: '0.4',
  },
  flexCenter:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  marginTop:{
    marginTop:'12px',
  },
  mobileContainer:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    padding:'24px',
    borderRadius:'12px',
    backgroundColor: normalBackgroundColor,
  },
  mobileHead:{
    ...fontDefaultStyle,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:'12px',
  },
  mobileDetail:{
    fontFamily: 'Helvetica',
    fontSize: '16px',
    color: '#A4A6B3',
    letterSpacing: '0',
    lineHeight: '14px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    margin:'18px',
  },
  mobileMaxButton:{
    [theme.breakpoints.down("xs")]: {
      width:'42px',
      height:'24px',
      fontSize: '12px',
      lineHeight: '16px',
    },
  },
  mobileInput:{
    [theme.breakpoints.down("xs")]: {
      width:'100px',
    },
  },
})

export {StyledTableCell,StyledTableRow,stakePoolsStyle};