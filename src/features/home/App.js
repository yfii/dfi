import React, { useEffect } from 'react';
//  notistack
import { SnackbarProvider } from 'notistack';
//  core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import FooterLinks from 'components/Footer/FooterLinks.js'
//  @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//  hooks
import { useWeb3Modal, useConnectWallet, useDisconnectWallet } from './redux/hooks';
//  core pages
//  style for this page
import appStyle from "./jss/appStyle.js";

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { web3Modal, createWeb3Modal } = useWeb3Modal();
  const { web3, address, connectWallet, connectWalletPending } = useConnectWallet();
  const { disconnectWallet } = useDisconnectWallet();

  useEffect(() => {
    createWeb3Modal()
  }, [createWeb3Modal])

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet(web3Modal)
    }
  }, [web3Modal, connectWallet])

  return (
    <SnackbarProvider>
      <div className={classes.page}>
        <Header
          brand="YFII"
          links={
            <HeaderLinks
              dropdownHoverColor="dark"
              address={address}
              action={{
                connectWallet: () => connectWallet(web3Modal),
                disconnectWallet: () => disconnectWallet({web3, web3Modal})
              }}
            />
          }
          color="dark"
        />
        <div className={classes.container}>
          { connectWalletPending ? children : children }
        </div>
        <FooterLinks />
      </div>
    </SnackbarProvider>
  );
}
