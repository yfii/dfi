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
import { useWallet } from './redux/hooks';
//  core pages
//  style for this page
import appStyle from "./jss/appStyle.js";

const useStyles = makeStyles(appStyle);

export default function App({ children }) {
  const classes = useStyles();
  const { web3, address, initialize, initializePending } = useWallet();

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <SnackbarProvider>
      <div className={classes.page}>
        <Header
          brand="YFII"
          links={
            <HeaderLinks
              dropdownHoverColor="dark"
              address={address}
              // action={{
              //   connectWallet: () => initialize(web3Modal),
              //   disconnectWallet: () => disconnectWallet({web3, web3Modal})
              // }}
            />
          }
          color="dark"
        />
        <div className={classes.container}>
          { initializePending ? children : children }
        </div>
        <FooterLinks />
      </div>
    </SnackbarProvider>
  );
}
