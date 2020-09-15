import React, { useEffect, useState } from 'react';
//  notistack
import { SnackbarProvider } from 'notistack';
//  core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import FooterLinks from 'components/Footer/FooterLinks.js'
//  @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//  hooks
import { useConnectWallet, useDisconnectWallet } from './redux/hooks';
//  i18n
import i18next from 'i18next';
//  web3Modal
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
//  core pages
//  style for this page
import appStyle from "./jss/appStyle.js";

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { connectWallet, web3, address, connected } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();
  const [ web3Modal, setModal ] = useState(null)

  useEffect(() => {
    const newModal = new Web3Modal({
      network: process.env.NETWORK ? process.env.NETWORK : "mainet",
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            name: "Injected",
            description: i18next.t('Home-BrowserWallet')
          },
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: process.env.INFURA_ID
          }
        }
      }
    })
    setModal(newModal)
  }, [setModal])

  

  useEffect(() => {
    if (web3Modal && (web3Modal.cachedProvider || window.ethereum)) {
      connectWallet(web3Modal);
    }
  }, [web3Modal, connectWallet, window.ethereum])

  return (
    <SnackbarProvider>
      <div className={classes.page}>
        <Header
          brand="YFII"
          links={
            <HeaderLinks
              dropdownHoverColor="dark"
              address={address}
              connected={connected}
              connectWallet={() => connectWallet(web3Modal)}
              disconnectWallet={() => disconnectWallet(web3, web3Modal)}
            />
          }
          color="dark"
        />
        <div className={classes.container}>
            <div className={classes.children}>
                { children }
            </div>
          <FooterLinks />
        </div>
      </div>
    </SnackbarProvider>
  );
}
