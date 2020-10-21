import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { useTranslation } from 'react-i18next';

import { injectedConnector, walletconnect } from './connectors';

const Unlock = () => {
  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React();

  const onClick = () => {
    activate(walletconnect);
  };

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
