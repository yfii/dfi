import React, { useEffect, useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Header from 'components/Header/Header';
import HeaderLinks from 'components/HeaderLinks/HeaderLinks';

import { useTranslation } from 'react-i18next';

import { SnackbarProvider } from 'notistack';
import { Notifier } from 'features/common';

import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import Footer from '../../components/Footer/Footer';
import Pastures from '../../components/Pastures/Pastures';
import appStyle from './jss/appStyle.js';

import { useConnectWallet, useDisconnectWallet } from './redux/hooks';

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    connectWallet,
    web3,
    address,
    networkId,
    connected,
    connectWalletPending,
  } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);

  useEffect(() => {
    const newModal = new Web3Modal({
      network: 'binance',
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            name: 'Injected',
            description: t('Home-BrowserWallet'),
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: 'https://bsc-dataseed.binance.org/',
              56: 'https://bsc-dataseed.binance.org/',
            },
          },
        },
        "custom-binance": {
          display: {
            name: 'Binance',
            description: t('Binance Chain Wallet'),
            logo: require(`images/binance-wallet.png`),
          },
          package: 'binance',
          connector: async (ProviderPackage, options) => {
            const provider = window.BinanceChain;
            await provider.enable();
            return provider;
          }
        },
      },
    });
    setModal(newModal);
  }, [setModal, t]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  useEffect(() => {
    if (
      web3 &&
      address &&
      !connectWalletPending &&
      networkId &&
      Boolean(networkId !== Number(process.env.REACT_APP_NETWORK_ID))
    ) {
      alert(t('Network-Error'));
    }
  }, [web3, address, networkId, connectWalletPending, t]);

  return (
    <StylesProvider injectFirst>
      <SnackbarProvider>
        <div className={classes.page}>
          <Header
            links={
              <HeaderLinks
                address={address}
                connected={connected}
                connectWallet={() => connectWallet(web3Modal)}
                disconnectWallet={() => disconnectWallet(web3, web3Modal)}
              />
            }
          />
          <div className={classes.container}>
            <div className={classes.children}>
              {Boolean(networkId === Number(process.env.REACT_APP_NETWORK_ID)) && children}
              <Notifier />
            </div>
          </div>

          <Footer />
          <Pastures />
        </div>
      </SnackbarProvider>
    </StylesProvider>
  );
}
