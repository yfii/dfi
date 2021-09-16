import React, { createContext, useContext, useState, useMemo } from 'react';

export const NetworksContext = createContext(null);

export const networks = [
  {
    name: 'BSC',
    asset: 'BSC',
    id: 56,
    hash: '/bsc',
  },
  {
    name: 'HECO',
    asset: 'HECO',
    id: 128,
    hash: '/heco',
  },
  {
    name: 'AVALANCHE',
    asset: 'AVALANCHE',
    id: 43114,
    hash: '/avax',
  },
  {
    name: 'POLYGON',
    asset: 'POLYGON',
    id: 137,
    hash: '/polygon',
  },
  {
    name: 'FANTOM',
    asset: 'FANTOM',
    id: 250,
    hash: '/fantom',
  },
  {
    name: 'HARMONY',
    asset: 'HARMONY',
    id: 1666600000,
    hash: '/harmony',
  },
  {
    name: 'ARBITRUM',
    asset: 'ARBITRUM',
    id: 42161,
    hash: '/arbitrum',
  },
];

const NetworksProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const currentNetwork = useMemo(
    () => networks.find(network => network.id === window.REACT_APP_NETWORK_ID),
    []
  );

  return (
    <NetworksContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        networks,
        currentNetwork,
      }}
    >
      {children}
    </NetworksContext.Provider>
  );
};

export const useNetworks = () => {
  const context = useContext(NetworksContext);

  return context;
};

export default NetworksProvider;
