import React, { createContext, useContext, useState, useMemo } from 'react';

export const NetworksContext = createContext(null);

export const networks = [
  {
    name: 'BSC',
    asset: 'BSC',
    id: 56,
    url: '/#/bsc',
  },
  {
    name: 'HECO',
    asset: 'HECO',
    id: 128,
    url: '/#/heco',
  },
  {
    name: 'AVALANCHE',
    asset: 'AVAX',
    id: 43114,
    url: '/#/avax',
  },
  {
    name: 'POLYGON',
    asset: 'POLYGON',
    id: 137,
    url: '/#/polygon',
  },
  {
    name: 'FANTOM',
    asset: 'FANTOM',
    id: 250,
    url: '/#/fantom',
  },
  {
    name: 'HARMONY',
    asset: 'HARMONY',
    id: 1666600000,
    url: '/#/harmony',
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
