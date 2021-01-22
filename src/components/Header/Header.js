import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import Close from '@material-ui/icons/Close';
import WbSunny from '@material-ui/icons/WbSunny';
import NightsStay from '@material-ui/icons/NightsStay';

import styles from './styles';

const useStyles = makeStyles(styles);

const Header = ({ links, isNightMode, setNightMode }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar className={`${classes.appBar} ${classes.dark}`}>
      <Toolbar className={classes.container}>
        <Button className={classes.title}>
          <Hidden xsDown>
            <img
              alt="BIFI"
              src={require(`images/BIFI.svg`)}
              height={'40px'}
              className={classes.logo}
            />
            <a href="https://beefy.finance">beefy.finance</a>
          </Hidden>
          <Hidden smUp>
            <img
              alt="BIFI"
              src={require(`images/BIFI.svg`)}
              height={'35px'}
              className={classes.logo}
            />
          </Hidden>
        </Button>

        <span>
          {renderLink('vote', 'vote', 'vote-yea', classes)}
          <Hidden xsDown>
            {renderLink('gov', 'gov', 'landmark', classes)}
            {renderLink('dashboard', 'stats', 'chart-bar', classes)}
            {renderLink('docs', 'docs', 'book', classes)}
          </Hidden>
          {renderLink('buy', 'buy', 'dollar-sign', classes)}
        </span>

        <Hidden smDown implementation="css">
          <div className={classes.collapse}>{links}</div>
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.iconButton}
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>

      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={'right'}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            className={classes.closeButtonDrawer}
          >
            <Close />
          </IconButton>
          <div className={classes.appResponsive}>{links}</div>
          <div style={{ textAlign: 'center' }}>
            {renderLinkSidebar('gov', 'gov', 'landmark', classes)}
            {renderLinkSidebar('vote', 'vote', 'vote-yea', classes)}
            {renderLinkSidebar('dashboard', 'stats', 'chart-bar', classes)}
            {renderLinkSidebar('docs', 'docs', 'book', classes)}
            {renderLinkSidebar('buy', 'buy', 'dollar-sign', classes)}
            <IconButton onClick={setNightMode} className={classes.icon}>
              {isNightMode ? <WbSunny /> : <NightsStay />}
            </IconButton>
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

const renderLink = (name, label, icon, classes) => {
  return (
    <a
      href={getLinkUrl(name)}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.link}
      style={{ marginLeft: '5px', marginRight: '5px' }}
    >
      <i className={`fas fa-${icon} ${classes.icon}`} />
      <span>{label}</span>
    </a>
  );
};

const renderLinkSidebar = (name, label, icon, classes) => {
  return (
    <div style={{ width: '100%', paddingTop: '10px' }}>
      {renderLink(name, label, icon, classes)}
    </div>
  );
};

const getLinkUrl = name => {
  return name === 'buy'
    ? 'https://streetswap.vip/#/swap?inputCurrency=BNB&outputCurrency=0xca3f508b8e4dd382ee878a314789373d80a5190a'
    : `https://${name}.beefy.finance`;
};

export default Header;
