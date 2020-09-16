import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    depositedBalanceSliderRoot:{
        color:'#FF2D82',
    },
    depositedBalanceSliderMarkLabel:{
        color:'#FF2D82',
    },
    depositedBalanceSliderRail:{
        opacity:'1',
        color:'#353848',
    },
    depositedBalanceSliderMark:{
        height:'0',
    },
});

export default function CustomSlider(props) {
    const commonStyle = useStyles();
    const commonClasses = {
        root: commonStyle.depositedBalanceSliderRoot,
        markLabel: commonStyle.depositedBalanceSliderMarkLabel,
        rail:commonStyle.depositedBalanceSliderRail,
        mark:commonStyle.depositedBalanceSliderMark,
    };
    const {
        classes
    } = props;
    return (
        <Slider 
            {...props}
            classes={Object.assign({},commonClasses,classes)}
            />
    )
}

CustomSlider.defaultProps = {
    defaultValue: 0,
    valueLabelDisplay:'auto',
    marks:[
      {
          value: 0,
          label: '0%',
        },
        {
          value: 25,
          label: '25%',
        },
        {
          value: 50,
          label: '50%',
        },
        {
          value: 75,
          label: '75%',
        },
        {
          value: 100,
          label: '100%',
        },
    ]
};

CustomSlider.propTypes = {
    classes:PropTypes.object,
    ariaLabelledby:PropTypes.string,
    defaultValue:PropTypes.number,
    valueLabelDisplay:PropTypes.string,
    marks:PropTypes.array,
};
  