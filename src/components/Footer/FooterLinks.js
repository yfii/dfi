/* eslint-disable */
import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import Footer from "components/Footer/Footer.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.js";
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-pro-react/components/footerLinksStyle.js";
import classNames from "classnames";
import {
    grayColor,
    roseColor,
    primaryColor,
    secondaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    blackColor,
    whiteColor,
    twitterColor,
    facebookColor,
    googleColor,
    linkedinColor,
    pinterestColor,
    youtubeColor,
    tumblrColor,
    behanceColor,
    dribbbleColor,
    redditColor,
    instagramColor,
    hexToRgb
  } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles(styles);

export default function FooterLinks(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const color = props.color;
    const badgeClasses = classNames({
        [classes.container]: true,
        [classes.fixed]: props.fixed,
    });

    //留着控制底部联系方式的颜色
    const iconGroundStyle={
        width:'40px',
        height:'40px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontSize: "1.25rem",
        borderRadius: "1.25rem",
        color:'white',
        backgroundColor:primaryColor[0],
    }

    const iconColorStyle={
        fontSize: "40px",
        color:primaryColor[0],
    }

    return (
        <div className={badgeClasses}>
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    href="https://twitter.com/DfiMoney"
                    target="_blank"
                    >
                    <i
                        style={iconGroundStyle}
                        className={
                        classes.socialIcons +
                        " " +
                        classes.marginRight5 +
                        " fab fa-twitter"
                        }
                    />{" "}
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    href="https://t.me/yfiifinance"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        classes.socialIcons +
                        " " +
                        classes.marginRight5 +
                        " fab fa-telegram"
                        }
                    />
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    href="https://discord.com/"
                    target="_blank"
                    >
                    <i
                        style={iconGroundStyle}
                        className={" fab fa-discord"}
                    />{" "}
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    href="https://github.com/yfii/vault"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        classes.socialIcons +
                        " " +
                        classes.marginRight5 +
                        " fab fa-github"
                        }
                    />{" "}
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                    color={color}
                    className={
                        classes.navLink + " " + classes.socialIconsButton
                    }
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    >
                    <i
                        style={iconGroundStyle}
                        className={
                        classes.socialIcons +
                        " " +
                        classes.marginRight5 +
                        " fab fa-weixin"
                        }
                    />{" "}
                    </Button>
                    <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                        paper: classes.paper,
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                    >
                    <Avatar variant="square" alt="YFII" src={require(`../../images/wechat.png`)} style={{width: "80px", height: "80px"}}/>
                    </Popover>
                </ListItem>
            </List>
        </div>
    )
}

FooterLinks.defaultProps = {
    color: "transparent",
    fixed:false
  };
  
FooterLinks.propTypes = {
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "transparent",
        "white",
        "rose",
        "dark"
    ]),
    fixed: PropTypes.bool,
};
  