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
    borderRadius:'6px',
    padding:'24px',
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
      "&:hover,&:focus": {
          backgroundColor: primaryColor,
      }
  },
  rewardsButton:{
      backgroundColor: secondColor,
      "&:hover,&:focus": {
          backgroundColor: secondColor,
      }
  },
  grayButton:{
      color:primaryColor,
      backgroundColor:'#353848',
      boxShadow:'0 2px 2px 0 #353848',
      "&:hover,&:focus": {
          color:primaryColor,
          backgroundColor: '#353848',
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
      backgroundColor:'#fff',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
  },
  avatar:{
      width:'38px',
      height:'38px',
  },
  detailContainer:{
      width:'100%',
  },
  detailTitle:{
    fontFamily: 'Helvetica',
    fontSize: '32px',
    color: '#FFFFFF',
    letterSpacing: '0',
    lineHeight: '32px',
    fontWeight: "550",
    margin:'24px 0'
  },
  detailContent:{
      backgroundColor: normalBackgroundColor,
      borderRadius: '24px',
      padding:'48px',
  },
  marginBottom:{
      marginBottom:'48px',
  },
  contentTitle:{
      display:"flex",
      justifyContent:'center',
  },
  contentTitleItem:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      padding:'0 12px',
      '& :first-child':{
          ...fontDefaultStyle,
          fontSize: '28px',
          color: primaryColor,
          lineHeight: '28px',
          marginBottom:'12px',
      },
      '& :last-child':{
          ...fontDefaultStyle,
          opacity: '0.4',
      },
  },
  contentTitleItemBorder:{
      borderRight:'1px solid rgb(255,255,255,0.1)',
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
  },
  inputAvatarContainer:{
      width:'40px',
      height:'40px',
      borderRadius:'40px',
      backgroundColor:'#fff',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
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
  }
})

export {StyledTableCell,StyledTableRow,stakePoolsStyle};