import {
  title,
  mrAuto,
  mlAuto,
  grayColor
} from "assets/jss/material-kit-pro-react.js";

import checkboxes from "assets/jss/material-kit-pro-react/customCheckboxRadioSwitchStyle.js";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.js";
import tooltips from "assets/jss/material-kit-pro-react/tooltipsStyle.js";

const contentAreas = {
  title,
  mrAuto,
  mlAuto,
  ...checkboxes,
  ...buttonGroup,
  ...tooltips,
  space50: {
    height: "50px",
    display: "block"
  },
  padding0: {
    padding: "0 !important"
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    "& img": {
      width: "100%"
    }
  },
  description: {
    maxWidth: "150px"
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em"
  },
  tdNameAnchor: {
    color: grayColor[1]
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300"
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "150px",
    fontWeight: "300",
    fontSize: "1.125em !important"
  },
  tdNumberSmall: {
    marginRight: "3px"
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0"
    },
    "& svg": {
      marginRight: "0"
    }
  },
  customFont: {
    fontSize: "16px !important"
  },
  actionButton: {
    margin: "0px",
    padding: "5px"
  },
  textCenter: {
    textAlign: "center"
  },
  textRight: {
    textAlign: "right"
  },
  floatRight: {
    float: "right"
  },
  justifyContentCenter: {
    WebkitBoxPack: "center !important",
    MsFlexPack: "center !important",
    justifyContent: "center !important"
  },
  signInButton: {
    "& button": {
      marginRight: "5px"
    }
  }
};

export default contentAreas;
