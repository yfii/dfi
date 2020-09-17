const fontDefaultStyle = {
    color: '#fff',
    fontFamily: 'Helvetica',
    fontSize: '18px',
    letterSpacing: '0',
    lineHeight: '18px',
};

const normalBackgroundColor = '#2C3040';
const primaryColor = '#FF2D82';
const secondColor = '#635AFF';

const stakePoolsStyle = theme => ({
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
        width:'88px',
        height:'40px',
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
    firstCell:{
        display:'flex',
    },
    firstCellContent:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
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
        ...fontDefaultStyle,
        fontSize: '32px',
        lineHeight: '32px',
        margin:'24px 0'
    },
    detailContent:{
        height:'288px',
        backgroundColor: normalBackgroundColor,
        borderRadius: '24px',
    },
})

export default stakePoolsStyle;