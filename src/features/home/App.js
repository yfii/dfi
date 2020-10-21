import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import ethers from 'ethers';

import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

import { SnackbarProvider } from 'notistack';
import { Notifier } from 'features/common';

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';
import Footer from 'components/Footer/Footer';
import Pastures from 'components/Pastures/Pastures';
import appStyle from './jss/appStyle';
import Unlock from './Unlock';

const getLibrary = provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { t } = useTranslation();

  const connected = false;
  const address = '0x0000000000000000000000000000000000000000';
  const web3 = null;

  const connectWallet = () => {
    console.log('noop');
  };

  const disconnectWallet = web3 => {
    console.log('noop');
  };

  return (
    <SnackbarProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className={classes.page}>
          <Header
            brand="beefy.finance"
            links={<HeaderLinks dropdownHoverColor="dark" address={address} connected={connected} connectWallet={() => connectWallet()} disconnectWallet={() => disconnectWallet(web3)} />}
            color="dark"
          />
          <Unlock />
          <div className={classes.container}>
            <div className={classes.children}>
              {children}
              <Notifier />
            </div>
          </div>

          <Footer />
          <Pastures />
        </div>
      </Web3ReactProvider>
    </SnackbarProvider>
  );
}
