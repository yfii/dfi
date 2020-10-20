import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';

import { useTranslation } from 'react-i18next';

import { SnackbarProvider } from 'notistack';
import { Notifier } from 'features/common';

import Footer from 'components/Footer/Footer';
import Pastures from 'components/Pastures/Pastures';
import appStyle from './jss/appStyle';

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { t } = useTranslation();

  // FIXME: implement this
  const connected = false;
  const address = '0x0000000000000000000000000000000000000000';
  const web3 = null;

  const connectWallet = () => { console.log('noop'); }
  const disconnectWallet = (web3) => { console.log('noop'); }

  return (
    <SnackbarProvider>
      <div className={classes.page}>
        <Header
          brand="beefy.finance"
          links={
            <HeaderLinks dropdownHoverColor="dark" address={address} connected={connected} connectWallet={() => connectWallet()} disconnectWallet={() => disconnectWallet(web3)} />
          }
          color="dark"
        />
        <div className={classes.container}>
          <div className={classes.children}>
            {children}
            <Notifier />
          </div>
        </div>

        <Footer />
        <Pastures />
      </div>
    </SnackbarProvider>
  );
}
