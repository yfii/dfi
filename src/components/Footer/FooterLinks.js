/* eslint-disable */
import React, { useEffect, useState } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import Footer from "components/Footer/Footer.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
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

const footerLinkArr = [
    {content:'Link.Contract',href:'https://etherscan.io/address/0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83'},
    // {content:'CoinMarketCap',href:'https://coinmarketcap.com/zh/currencies/yearn-finance-ii/'},
    // {content:'CoinGecko',href:'https://www.coingecko.com/en/coins/dfi-money'},
    {content:'Link.Forum',href:'https://gov.dfi.money/'},
    {content:'Link.Audit',href:'https://github.com/yfii/audit'},
    {content:'Link.Stats',href:'https://stats.dfi.money/'},
    {content:'Link.Voting',href:'https://voting.dfi.money/#/dfi'},
    {content:'Link.Documentation',href:'https://docs.dfi.money/'},
    {content:'Link.Uniswap',href:'https://app.uniswap.org/#/swap?outputCurrency=0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83'},
    {content:'Link.v1Vault',href:'https://v1.dfi.money/'},
    {content:'Link.oldVault',href:'https://old.dfi.money/'},
    {content:'Link.todos',href:'https://todos.dfi.money/'},
];

export default function FooterLinks(props) {
    const classes = useStyles();
    const { t } = useTranslation();

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
        fontSize: "24px",
        color: "#fff"
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
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-twitter"
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
                    href="https://t.me/yfiifinance"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-telegram"
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
                    href="https://discord.gg/XQ4wnmz"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-discord"
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
                    href="https://github.com/yfii"
                    target="_blank"
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-github"
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
                    aria-owns={open ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    >
                    <i
                        style={iconColorStyle}
                        className={
                        "yfiiicon yfii-wechat"
                        }
                    />
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
            <GridContainer className={classes.linkList} justify='center' align='center' >
                {
                    footerLinkArr.map((item)=>{
                        return (
                            <GridItem className={classes.linkItem} md={2} xs={6} key={item.content} >
                                <a className={classes.extraContent} href={item.href} target="_blank">{t(item.content)}</a>
                            </GridItem >
                        )
                    })
                }
            </GridContainer>
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
  