import Web3Modal, { connectors } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

export const createWeb3Modal = (t) => new Web3Modal({
  network: 'binance',
  cacheProvider: true,
  providerOptions: {
    injected: {
      display: {
        name: 'Injected',
        description: t('Home-BrowserWallet'),
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: 'https://bsc-dataseed.binance.org/',
          56: 'https://bsc-dataseed.binance.org/',
        },
      },
    },
    'custom-binance': {
      display: {
        name: 'Binance',
        description: t('Binance Chain Wallet'),
        logo: require(`images/binance-wallet.png`),
      },
      package: 'binance',
      connector: async (ProviderPackage, options) => {
        const provider = window.BinanceChain;
        await provider.enable();
        return provider;
      },
    },
    'custom-math': {
      display: {
        name: 'Math',
        description: t('Math Wallet'),
        logo: require(`images/math-wallet.svg`),
      },
      package: 'math',
      connector: connectors.injected,
    },
    'custom-twt': {
      display: {
        name: 'Trust',
        description: t('Trust Wallet'),
        logo: require(`images/trust-wallet.svg`),
      },
      package: 'twt',
      connector: connectors.injected,
    },
    'custom-safepal': {
      display: {
        name: 'SafePal',
        description: t('SafePal App'),
        logo: require(`images/safepal-wallet.svg`),
      },
      package: 'safepal',
      connector: connectors.injected,
    },
  },
});