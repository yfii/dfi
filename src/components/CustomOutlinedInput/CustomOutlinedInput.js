import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from '@material-ui/core/OutlinedInput';

const useStyles = makeStyles({
    showDetail:{
        // display:'inline-block',
        alignItems:'center',
        justifyContent:'space-around',
        width:'100%',
        height: '56px',
        background: '#353848',
        borderRadius: '12px',
        fontWeight: '600',
        fontSize: '18px',
        color: '#FFFFFF',
        lineHeight: '24px',
        fontWeight: '600',
    },
});

export default function CustomOutlinedInput(props) {
    const commonStyle = useStyles();
    const commonClasses = {
        root: commonStyle.showDetail
    };
    const {
        classes
    } = props;
    return (
        <OutlinedInput 
            {...props}
            classes={Object.assign({},commonClasses,classes)}
            />
    )
}

CustomOutlinedInput.defaultProps = {
    variant:"outlined",
    fullWidth:true,
}