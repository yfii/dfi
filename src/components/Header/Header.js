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

import styles from './styles';

const useStyles = makeStyles(styles);

const Header = ({ links }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar className={`${classes.appBar} ${classes.dark}`}>
      <Toolbar className={classes.container}>
        <Button className={classes.title}>
          <img alt="BIFI" src={require(`images/BIFI.svg`)} height="40px" className={classes.logo} />
          <a href="https://beefy.finance">beefy.finance</a>
        </Button>

        <span>
          {renderLink('gov', 'gov', 'landmark', classes)}
          {renderLink('vote', 'vote', 'vote-yea', classes)}
          {renderLink('dashboard', 'stats', 'chart-bar', classes)}
          {renderLink('docs', 'docs', 'book', classes)}
          {renderLink('buy', 'buy', 'dollar-sign', classes)}
        </span>

        <Hidden smDown implementation="css">
          <div className={classes.collapse}>{links}</div>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle}>
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
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

const renderLink = (name, label, icon, classes) => {
  
  if (name === "buy") {
    return (
      <a
        href="https://streetswap.vip/#/swap?inputCurrency=BNB&outputCurrency=0xca3f508b8e4dd382ee878a314789373d80a5190a"
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
      >
      <i className={`fas fa-${icon} ${classes.icon}`} />
      <span>{label}</span>
    </a>
    );
  }

  return (
    <a
      href={`https://${name}.beefy.finance`}
      target="_blank"
      rel="noopener noreferrer"
      className={classes.link}
    >
      <i className={`fas fa-${icon} ${classes.icon}`} />
      <span>{label}</span>
    </a>
  );
};

export default Header;
