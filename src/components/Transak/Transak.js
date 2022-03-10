import React from 'react';
import transakSDK from '@transak/transak-sdk';
import { Button } from '@material-ui/core';

const TransakNav = ({ className, children, ...props }) => {
  const { REACT_APP_TRANSAK_API_KEY, REACT_APP_ENVIRONMENT } = process.env;

  const transak = new transakSDK({
    apiKey: REACT_APP_TRANSAK_API_KEY,
    environment: REACT_APP_ENVIRONMENT, // STAGING/PRODUCTION (Required)
    walletAddress: '',
    themeColor: '59A662',
    email: '',
    hostURL: window.location.origin,
    widgetHeight: '550px',
    widgetWidth: '450px',
    defaultNetwork: 'bsc',
    defaultCryptoCurrency: 'bifi',
    networks: 'arbitrum,avaxcchain,polygon,bsc,celo,fantom,moonriver', // NETWORK PREFFERENCES
    cryptoCurrencyList:
      'eth,weth,usdt,usdc,matic,dai,qi,bnb,bifi,avax,ftm,cusd,ceur,movr,aave,sushi,busd,quick,celo,wbtc',
    defaultCryptoAmount: 1,
  });

  function initTransak() {
    transak.init();
  }

  return (
    <Button variant="body1" {...props} className={className} onClick={initTransak}>
      {children}
    </Button>
  );
};

const Transak = React.memo(TransakNav);
export default Transak;
