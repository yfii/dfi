import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { makeStyles, ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import Header from 'components/Header/Header';
import HeaderLinks from 'components/HeaderLinks/HeaderLinks';
import NetworksProvider from 'components/NetworksProvider/NetworksProvider';
import NetworksModal from 'components/NetworksModal/NetworksModal';
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import { Notifier } from 'features/common';
import Footer from 'components/Footer/Footer';
import Pastures from 'components/Pastures/Pastures';
import { NetworkConnectNotice } from 'components/NetworkConnectNotice/NetworkConnectNotice';
import appStyle from './jss/appStyle.js';
import { createWeb3Modal } from '../web3';
import { useConnectWallet, useDisconnectWallet } from './redux/hooks';
import useNightMode from './hooks/useNightMode';
import createTheme from './jss/appTheme';

const themes = { light: null, dark: null };
const getTheme = mode => {
  return (themes[mode] = themes[mode] || createTheme(mode === 'dark'));
};

export default function App({ children }) {
  const { t } = useTranslation();
  const { connectWallet, web3, address, networkId, connected } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [web3Modal, setModal] = useState(null);

  const { isNightMode, setNightMode } = useNightMode();
  const theme = useMemo(() => getTheme(isNightMode ? 'dark' : 'light'), [isNightMode]);
  const useStyles = useMemo(() => {
    return makeStyles(appStyle, { defaultTheme: theme });
  }, [theme]);
  const classes = useStyles();

  useEffect(() => {
    setModal(createWeb3Modal(t));
  }, [setModal, t]);

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet]);

  const connectWalletCallback = useCallback(() => {
    connectWallet(web3Modal);
  }, [web3Modal, connectWallet]);

  const disconnectWalletCallback = useCallback(() => {
    disconnectWallet(web3, web3Modal);
  }, [web3, web3Modal, disconnectWallet]);

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <NetworksProvider>
            <NetworksModal />
            <div className={classes.page}>
              <Header
                links={
                  <HeaderLinks
                    address={address}
                    connected={connected}
                    connectWallet={connectWalletCallback}
                    disconnectWallet={disconnectWalletCallback}
                    isNightMode={isNightMode}
                    setNightMode={() => setNightMode(!isNightMode)}
                  />
                }
                isNightMode={isNightMode}
                setNightMode={() => setNightMode(!isNightMode)}
              />
              <div className={classes.container}>
                <div className={classes.children}>
                  <NetworkConnectNotice
                    web3={web3}
                    address={address}
                    connectWallet={connectWalletCallback}
                    disconnectWallet={disconnectWalletCallback}
                    networkId={networkId}
                  />
                  {networkId === Number(process.env.REACT_APP_NETWORK_ID) ? children : null}
                  <Notifier />
                </div>
              </div>
              <Footer />
              <Pastures />
            </div>
          </NetworksProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </StylesProvider>
  );
}
