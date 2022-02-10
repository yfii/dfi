import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { WbSunny, NightsStay } from '@material-ui/icons';
import Button from 'components/CustomButtons/Button.js';
import { useTranslation } from 'react-i18next';
import { LanguageDropdown } from '../LanguageDropdown/LanguageDropdown';
import Davatar from '@davatar/react';

import styles from './styles';
import { useENS } from 'features/home/hooks/useENS';

const useStyles = makeStyles(styles);

const HeaderLinks = ({
  connected,
  address,
  connectWallet,
  disconnectWallet,
  isNightMode,
  setNightMode,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [shortAddress, setShortAddress] = useState('');
  const { ensName } = useENS(address);

  useEffect(() => {
    if (!connected) {
      return;
    }

    if (address.length < 11) {
      setShortAddress(address);
    } else {
      setShortAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [address, connected]);

  return (
    <List className={classes.list + ' ' + classes.mlAuto}>
      <Hidden smDown>
        <ListItem className={classes.listItem}>
          <IconButton onClick={setNightMode} className={classes.iconButton}>
            {isNightMode ? <WbSunny /> : <NightsStay />}
          </IconButton>
        </ListItem>
      </Hidden>
      <ListItem className={classes.listItem}>
        <LanguageDropdown navLinkClass={classes.navLink} />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          disableElevation
          className={classes.walletDisplay}
          onClick={connected ? disconnectWallet : connectWallet}
        >
          {connected ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '7px' }}>
                  <Davatar size={24} address={address} />
                </div>
                <div>{ensName || shortAddress}</div>
              </div>
            </>
          ) : (
            <>
              <i className={classes.icon + ' far fa-question-circle'} />
              {t('Vault-Wallet')}
            </>
          )}
        </Button>
      </ListItem>
    </List>
  );
};

export default HeaderLinks;
