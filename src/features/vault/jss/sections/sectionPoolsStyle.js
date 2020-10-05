import { title, mrAuto, mlAuto, primaryColor, secondaryColor, hoverColor, grayColor } from 'assets/jss/material-kit-pro-react.js';

import checkboxes from 'assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js';
import buttonGroup from 'assets/jss/material-kit-pro-react/buttonGroupStyle.js';
import tooltips from 'assets/jss/material-kit-pro-react/tooltipsStyle.js';

const secondStyle = {
  opacity: '0.4',
  fontFamily: 'Helvetica',
  fontSize: '14px',
  color: '#FFFFFF',
  letterSpacing: '0',
  lineHeight: '14px',
};

const sectionPoolsStyle = theme => ({
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
  title,
  mrAuto,
  mlAuto,
  ...checkboxes,
  ...buttonGroup,
  ...tooltips,
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  column: {
    flexBasis: '33.33%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'space-around',
  },
  space50: {
    height: '50px',
    display: 'block',
  },
  padding0: {
    padding: '0 !important',
  },
  imgContainer: {
    width: '120px',
    maxHeight: '160px',
    overflow: 'hidden',
    display: 'block',
    '& img': {
      width: '100%',
    },
  },
  description: {
    maxWidth: '150px',
  },
  tdName: {
    minWidth: '200px',
    fontWeight: '400',
    fontSize: '1.5em',
  },
  tdNameAnchor: {
    color: grayColor[1],
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: '0.75em',
    fontWeight: '300',
  },
  tdNumber: {
    textAlign: 'right',
    minWidth: '150px',
    fontWeight: '300',
    fontSize: '1.125em !important',
  },
  tdNumberSmall: {
    marginRight: '3px',
  },
  tdNumberAndButtonGroup: {
    lineHeight: '1 !important',
    '& .fab,& .fas,& .far,& .fal,& .material-icons': {
      marginRight: '0',
    },
    '& svg': {
      marginRight: '0',
    },
  },
  customFont: {
    fontSize: '16px !important',
  },
  actionButton: {
    margin: '0px',
    padding: '5px',
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  floatRight: {
    float: 'right',
  },
  justifyContentCenter: {
    WebkitBoxPack: 'center !important',
    MsFlexPack: 'center !important',
    justifyContent: 'center !important',
  },
  signInButton: {
    '& button': {
      marginRight: '5px',
    },
  },
  cardWrap: {
    minHeight: '170px',
  },
  iconContainerMainTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: primaryColor[0],
    lineHeight: '18px',
    letterSpacing: 0,
  },
  iconContainerSubTitle: {
    fontSize: '14px',
    fontWeight: '400',
    color: primaryColor[0],
    lineHeight: '14px',
    opacity: '0.4',
    letterSpacing: 0,
  },
  iconContainerSecond: {
    width: '48px',
    height: '48px',
    backgroundColor: '#353848',
    borderRadius: '8px',
    color: primaryColor[0],

    '& i': {
      fontSize: '24px',
    },
    '&:hover,&:focus': {
      backgroundColor: hoverColor[1],
    },
  },
  iconContainerPrimary: {
    width: '48px',
    height: '48px',
    backgroundColor: secondaryColor[0],
    border: '2px',
    borderColor: primaryColor[0],
    borderRadius: '8px',
    color: '#fff',
    '& i': {
      fontSize: '24px',
    },
    '&:hover,&:focus': {
      background: hoverColor[0],
    },
  },
  accordion: {
    backgroundColor: '#FBF6F0',
    color: '#fff',
    boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.06)',
    borderRadius: '8px',
  },
  accordionDivider: {
    margin: '0 30px',
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    background: '#FBF6F0',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.06)',
    borderRadius: '8px',
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  sliderDetailContainer: {
    padding: '24px 30px',
  },
  showDetailLeft: {
    float: 'left',
    marginBottom: '10px',
    fontSize: '1rem',
    lineHeight: '20px',
    color: primaryColor[1],
    fontWeight: '500',
  },
  MuiSliderRoot: {
    color: '#FF2D82',
  },
  showDetailButtonCon: {
    display: 'flex',
    justifyContent: 'space-around',
    '& + &': {
      marginLeft: '5px',
    },
  },
  showDetailButton: {
    margin: '12px 5px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '5px',
    width: '160px',
  },
  showDetailButtonOutlined: {
    backgroundColor: 'transparent',
    border: `1px solid ${primaryColor[0]}`,
    color: primaryColor[0],
    '&:hover': {
      '& .MuiButton-label': {
        color: 'white',
      },
    },
  },
  showDetailButtonContained: {
    backgroundColor: primaryColor[0],
    '& .MuiButton-label': {
      color: 'white',
    },
  },
  numericInput: {
    color: primaryColor[0],
  },
});

export default sectionPoolsStyle;
