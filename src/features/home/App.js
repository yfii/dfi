import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Header from 'components/Header/Header.js';
import HeaderLinks from 'components/Header/HeaderLinks.js';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import { SnackbarProvider } from 'notistack';
import { Notifier } from 'features/common';

import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import Footer from 'components/Footer/Footer';
import Pastures from 'components/Pastures/Pastures';
import appStyle from './jss/appStyle';

import { useConnectWallet, useDisconnectWallet } from './redux/hooks';

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { connectWallet, web3, address, networkId, connected, connectWalletPending } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);

  useEffect(() => {
    console.log('process.env.NETWORK', process.env.NETWORK);

    const newModal = new Web3Modal({
      network: process.env.NETWORK ? process.env.NETWORK : 'mainnet',
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            name: 'Injected',
            description: i18next.t('Home-BrowserWallet'),
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          rpc: {
            56: 'https://bsc-dataseed.binance.org/',
            97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
          },
        },
      },
    });
    setModal(newModal);
  }, [setModal]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  useEffect(() => {
    if (web3 && address && !connectWalletPending && networkId && Boolean(networkId !== Number(process.env.NETWORK_ID))) {
      alert(t('Network-Error'));
    }
  }, [web3, address, networkId, connectWalletPending, t]);

  return (
    <SnackbarProvider>
      <div className={classes.page}>
        <Header
          brand="beefy.finance"
          links={
            <HeaderLinks dropdownHoverColor="dark" address={address} connected={connected} connectWallet={() => connectWallet(web3Modal)} disconnectWallet={() => disconnectWallet(web3, web3Modal)} />
          }
          color="dark"
        />
        <div className={classes.container}>
          <div className={classes.children}>
            {Boolean(networkId === Number(process.env.NETWORK_ID)) && children}
            <Notifier />
          </div>
        </div>

        <Footer />
        <Pastures />
      </div>
    </SnackbarProvider>
  );
}
