import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { supportedLanguages } from '../../i18n';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const useStyles = makeStyles(styles);

const getSelectedLanguage = i18n => {
  const cachedLanguage = i18n.language;

  if (!cachedLanguage) {
    return 'en';
  }

  if (cachedLanguage in supportedLanguages) {
    return cachedLanguage;
  }

  const languageCode = cachedLanguage.split('-')[0].toLowerCase();
  if (languageCode in supportedLanguages) {
    return languageCode;
  }

  return 'en';
};

export const LanguageDropdown = function ({ navLinkClass }) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const i18nLanguage = getSelectedLanguage(i18n);
  const [selectedLanguage, setLanguage] = useState(i18nLanguage);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(
    e => {
      setAnchorEl(e.currentTarget);
    },
    [setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleSelect = useCallback(
    code => {
      setAnchorEl(null);
      i18n.changeLanguage(code);
    },
    [setAnchorEl, i18n]
  );

  useEffect(() => {
    setLanguage(i18nLanguage);
  }, [i18nLanguage]);

  return (
    <>
      <Button
        aria-controls="nav-lang-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={navLinkClass}
      >
        {selectedLanguage.toUpperCase()}
      </Button>
      <Menu
        id="nav-lang-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.dropdownMenu }}
      >
        {Object.entries(supportedLanguages).map(([code, label]) => (
          <MenuItem
            key={code}
            selected={code === selectedLanguage}
            onClick={() => handleSelect(code)}
          >
            {label}
          </MenuItem>
        ))}
        <MenuItem divider button={false} className={classes.divider} />
        <MenuItem button={false}>
          <a
            href="https://discord.gg/sj3drZd7dh"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.helpLink}
          >
            Help to translate
          </a>
        </MenuItem>
      </Menu>
    </>
  );
};
