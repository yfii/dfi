import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { URI_AVAILABLE } from '@web3-react/walletconnect-connector';

import { useTranslation } from 'react-i18next';

import { injectedConnector, walletconnect } from './connectors';

const Unlock = () => {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  const onClick = () => {
    activate(walletconnect);
  };

  React.useEffect(() => {
    console.log('running');
    const logURI = uri => {
      console.log('WalletConnect URI', uri);
    };
    walletconnect.on(URI_AVAILABLE, logURI);

    return () => {
      walletconnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  return (
    <div>
      {account} {active} {chainId}
      <button onClick={onClick}>Connect</button>
      <button
        onClick={() => {
          connector.close();
        }}
      >
        Disconnect
      </button>
    </div>
  );
};

export default Unlock;
