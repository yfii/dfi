import Web3Modal from 'web3modal';

import { getNetworkConnectors } from 'features/helpers/getNetworkData';

export const createWeb3Modal = t => {
  const connectors = getNetworkConnectors(t);
  const modal = new Web3Modal(connectors);

  if (modal.cachedProvider && !(modal.cachedProvider in connectors.providerOptions)) {
    modal.clearCachedProvider();
  }

  return modal;
};
