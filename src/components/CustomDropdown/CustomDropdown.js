import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Divider from "@material-ui/core/Divider";
import Popper from "@material-ui/core/Popper";
// core components
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-pro-react/components/customDropdownStyle.js";

const useStyles = makeStyles(styles);

export default function CustomDropdown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = event => {
    if (anchorEl.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };
  const handleCloseMenu = param => {
    setAnchorEl(null);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };
  const {
    buttonText,
    buttonIcon,
    dropdownList,
    buttonProps,
    dropup,
    dropdownHeader,
    caret,
    hoverColor,
    dropPlacement,
    rtlActive,
    noLiPadding,
    innerDropDown,
    navDropdown,
    darkModal,
    popperClassName,
  } = props;
  const classes = useStyles();
  const caretClasses = classNames({
    [classes.caret]: true,
    [classes.caretDropup]: dropup && !anchorEl,
    [classes.caretActive]: Boolean(anchorEl) && !dropup,
    [classes.caretRTL]: rtlActive
  });
  const dropdownItem = classNames({
    [classes.dropdownItem]: true,
    [classes[hoverColor + "Hover"]]: true,
    [classes.noLiPadding]: noLiPadding,
    [classes.dropdownItemRTL]: rtlActive,
    [classes.darkModalFont]:Boolean(darkModal),
  });
  const dropDownMenu = (
    <MenuList role="menu" style={{width:'100%'}} className={classes.menuList}>
      {dropdownHeader !== undefined ? (
        <MenuItem
          onClick={() => handleCloseMenu(dropdownHeader)}
          className={classes.dropdownHeader}
        >
          {dropdownHeader}
        </MenuItem>
      ) : null}
      {dropdownList.map((prop, key) => {
        if (prop.divider) {
          return (
            <Divider
              key={key}
              onClick={() => handleCloseMenu("divider")}
              className={classes.dropdownDividerItem}
            />
          );
        } else if (
          prop.props !== undefined &&
          prop.props["data-ref"] === "multi"
        ) {
          return (
            <MenuItem
              key={key}
              className={dropdownItem}
              style={{ overflow: "visible", padding: 0 }}
            >
              {prop}
            </MenuItem>
          );
        }
        return (
          <MenuItem
            key={key}
            onClick={() => handleCloseMenu(prop)}
            className={dropdownItem}
          >
            {prop}
          </MenuItem>
        );
      })}
    </MenuList>
  );
  return (
    <div className={innerDropDown ? classes.innerManager : classes.manager}>
      <div className={buttonText !== undefined ? "" : classes.target}>
        <Button
          aria-label="Notifications"
          aria-owns={anchorEl ? "menu-list" : null}
          aria-haspopup="true"
          {...buttonProps}
          onClick={handleClick}
        >
          {buttonIcon !== undefined ? (
            <props.buttonIcon className={classes.buttonIcon} />
          ) : null}
          {buttonText !== undefined ? buttonText : null}
          {caret ? <b className={caretClasses} /> : null}
        </Button>
      </div>
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={dropPlacement}
        className={classNames({
          [classes.popperClose]: !anchorEl,
          [classes.pooperResponsive]: true,
          [classes.pooperNav]: Boolean(anchorEl) && navDropdown,
          [popperClassName]: popperClassName,
        })}
      >
        {() => (
          <Grow
            in={Boolean(anchorEl)}
            id="menu-list"
            style={
              dropup
                ? { transformOrigin: "0 100% 0" }
                : { transformOrigin: "0 0 0" }
            }
          >
            <Paper className={
                classNames({
                    [classes.dropdown]:true,
                    [classes.darkModalGround]:Boolean(darkModal),
                })
            }>
              {innerDropDown ? (
                dropDownMenu
              ) : (
                <ClickAwayListener onClickAway={handleClose}>
                  {dropDownMenu}
                </ClickAwayListener>
              )}
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

CustomDropdown.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: "primary",
  darkModal:false,
};

CustomDropdown.propTypes = {
  hoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.object,
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  dropPlacement: PropTypes.oneOf([
    "bottom",
    "top",
    "right",
    "left",
    "bottom-start",
    "bottom-end",
    "top-start",
    "top-end",
    "right-start",
    "right-end",
    "left-start",
    "left-end"
  ]),
  noLiPadding: PropTypes.bool,
  innerDropDown: PropTypes.bool,
  navDropdown: PropTypes.bool,
  // This is a function that returns the clicked menu item
  onClick: PropTypes.func,
  darkModal:PropTypes.bool,
  popperClassName: PropTypes.string
};
