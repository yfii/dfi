import { connectors } from 'web3modal';
import { indexBy } from './utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { DeFiConnector } from 'deficonnect';
import WalletLink from 'walletlink';
import { CloverConnector } from '@clover-network/clover-connector';
import { allNetworks } from '../../network';
import {
  avalanchePools,
  avalancheStakePools,
  avaxAddressBook,
  avalancheZaps,
  bscPools,
  bscStakePools,
  bscAddressBook,
  bscZaps,
  fantomPools,
  fantomStakePools,
  fantomAddressBook,
  fantomZaps,
  hecoPools,
  hecoStakePools,
  hecoAddressBook,
  hecoZaps,
  nativeCoins,
  polygonPools,
  polygonStakePools,
  polygonAddressBook,
  polygonZaps,
  celoPools,
  celoStakePools,
  celoAddressBook,
  celoZaps,
  moonriverPools,
  moonriverStakePools,
  moonriverAddressBook,
  moonriverZaps,
  harmonyPools,
  harmonyStakePools,
  harmonyAddressBook,
  harmonyZaps,
  cronosPools,
  cronosStakePools,
  cronosAddressBook,
  cronosZaps,
  auroraPools,
  auroraStakePools,
  auroraAddressBook,
  auroraZaps,
  arbitrumPools,
  arbitrumStakePools,
  arbitrumAddressBook,
  arbitrumZaps,
  fusePools,
  fuseStakePools,
  fuseAddressBook,
  fuseZaps,
  metisPools,
  metisStakePools,
  metisAddressBook,
  metisZaps,
  moonbeamPools,
  moonbeamStakePools,
  moonbeamAddressBook,
  moonbeamZaps,
  emeraldPools,
  emeraldStakePools,
  emeraldAddressBook,
  emeraldZaps,
} from '../configure';

export const appNetworkId = window.REACT_APP_NETWORK_ID;

const networkTxUrls = {
  56: hash => `https://bscscan.com/tx/${hash}`,
  128: hash => `https://hecoinfo.com/tx/${hash}`,
  43114: hash => `https://snowtrace.io/tx/${hash}`,
  137: hash => `https://polygonscan.com/tx/${hash}`,
  250: hash => `https://ftmscan.com/tx/${hash}`,
  1666600000: hash => `https://explorer.harmony.one/tx/${hash}`,
  42161: hash => `https://arbiscan.io/tx/${hash}`,
  42220: hash => `https://explorer.celo.org/tx/${hash}`,
  1285: hash => `https://moonriver.moonscan.io/tx/${hash}`,
  25: hash => `https://cronos.crypto.org/explorer/tx/${hash}`,
  1313161554: hash => `https://explorer.mainnet.aurora.dev/tx/${hash}`,
  122: hash => `https://explorer.fuse.io/tx/${hash}`,
  1088: hash => `https://andromeda-explorer.metis.io/tx/${hash}`,
  1284: hash => `https://moonscan.io/tx/${hash}`,
  42262: hash => `https://explorer.emerald.oasis.dev/tx/${hash}`,
};

const networkFriendlyName = {
  56: 'BSC',
  128: 'HECO',
  43114: 'AVAX',
  137: 'Polygon',
  250: 'Fantom',
  1666600000: 'Harmony',
  42161: 'Arbitrum',
  42220: 'Celo',
  1285: 'Moonriver',
  25: 'Cronos',
  1313161554: 'Aurora',
  122: 'Fuse',
  1088: 'Metis',
  1284: 'Moonbeam',
  42262: 'Oasis Emerald',
};

const networkBuyUrls = {
  56: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
  128: 'https://ht.mdex.com/#/swap?inputCurrency=0xa71edc38d189767582c38a3145b5873052c3e47a&outputCurrency=0x765277eebeca2e31912c9946eae1021199b39c61',
  137: 'https://app.1inch.io/#/r/0xF4cb25a1FF50E319c267b3E51CBeC2699FB2A43B',
  250: 'https://spooky.fi/#/swap?inputCurrency=0x04068da6c83afcfa0e13ba15a6696662335d5b75&outputCurrency=0xd6070ae98b8069de6B494332d1A1a81B6179D960',
  43114:
    'https://www.traderjoexyz.com/trade?outputCurrency=0xd6070ae98b8069de6b494332d1a1a81b6179d960',
  1666600000:
    'https://app.sushi.com/swap?inputCurrency=0x6ab6d61428fde76768d7b45d8bfeec19c6ef91a8&outputCurrency=0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
  42161:
    'https://app.sushi.com/swap?inputCurrency=0x82af49447d8a07e3bd95bd0d56f35241523fbab1&outputCurrency=0x99c409e5f62e4bd2ac142f17cafb6810b8f0baae',
  42220:
    'https://app.sushi.com/swap?inputCurrency=0x471ece3750da237f93b8e339c536989b8978a438&outputCurrency=0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c',
  1285: 'https://app.sushi.com/swap?inputCurrency=0x173fd7434b8b50df08e3298f173487ebdb35fd14&outputCurrency=0xf50225a84382c74cbdea10b0c176f71fc3de0c4d',
  25: 'https://vvs.finance/swap?inputCurrency=0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23&outputCurrency=0xe6801928061cdbe32ac5ad0634427e140efd05f9',
  1313161554: '',
  122: '',
  1088: 'https://netswap.io/#/swap?outputCurrency=0xe6801928061cdbe32ac5ad0634427e140efd05f9',
  1284: '',
  42262: '',
};

export const getNetworkCoin = () => {
  return nativeCoins.find(coin => coin.chainId === appNetworkId);
};

export const getNetworkPools = () => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 56:
      return bscPools;
    case 128:
      return hecoPools;
    case 43114:
      return avalanchePools;
    case 137:
      return polygonPools;
    case 250:
      return fantomPools;
    case 1666600000:
      return harmonyPools;
    case 42161:
      return arbitrumPools;
    case 42220:
      return celoPools;
    case 1285:
      return moonriverPools;
    case 25:
      return cronosPools;
    case 1313161554:
      return auroraPools;
    case 122:
      return fusePools;
    case 1088:
      return metisPools;
    case 1284:
      return moonbeamPools;
    case 42262:
      return emeraldPools;
    default:
      return [];
  }
};

export const getNetworkVaults = (networkId = appNetworkId) => {
  switch (networkId) {
    case 56:
      return indexBy(bscPools, 'id');
    case 128:
      return indexBy(hecoPools, 'id');
    case 43114:
      return indexBy(avalanchePools, 'id');
    case 137:
      return indexBy(polygonPools, 'id');
    case 250:
      return indexBy(fantomPools, 'id');
    case 1666600000:
      return indexBy(harmonyPools, 'id');
    case 42161:
      return indexBy(arbitrumPools, 'id');
    case 42220:
      return indexBy(celoPools, 'id');
    case 1285:
      return indexBy(moonriverPools, 'id');
    case 25:
      return indexBy(cronosPools, 'id');
    case 1313161554:
      return indexBy(auroraPools, 'id');
    case 122:
      return indexBy(fusePools, 'id');
    case 1088:
      return indexBy(metisPools, 'id');
    case 1284:
      return indexBy(moonbeamPools, 'id');
    case 42262:
      return indexBy(emeraldPools, 'id');
    default:
      return {};
  }
};

export const getNetworkLaunchpools = (networkId = appNetworkId) => {
  switch (networkId) {
    case 56:
      return indexBy(bscStakePools, 'id');
    case 128:
      return indexBy(hecoStakePools, 'id');
    case 43114:
      return indexBy(avalancheStakePools, 'id');
    case 137:
      return indexBy(polygonStakePools, 'id');
    case 250:
      return indexBy(fantomStakePools, 'id');
    case 1666600000:
      return indexBy(harmonyStakePools, 'id');
    case 42161:
      return indexBy(arbitrumStakePools, 'id');
    case 42220:
      return indexBy(celoStakePools, 'id');
    case 1285:
      return indexBy(moonriverStakePools, 'id');
    case 25:
      return indexBy(cronosStakePools, 'id');
    case 1313161554:
      return indexBy(auroraStakePools, 'id');
    case 122:
      return indexBy(fuseStakePools, 'id');
    case 1088:
      return indexBy(metisStakePools, 'id');
    case 1284:
      return indexBy(moonbeamStakePools, 'id');
    case 42262:
      return indexBy(emeraldStakePools, 'id');
    default:
      return {};
  }
};

export const getNetworkTokens = () => {
  const chainId = window.REACT_APP_NETWORK_ID;
  switch (chainId) {
    case 56:
      return bscAddressBook.tokens;
    case 128:
      return hecoAddressBook.tokens;
    case 43114:
      return avaxAddressBook.tokens;
    case 137:
      return polygonAddressBook.tokens;
    case 250:
      return fantomAddressBook.tokens;
    case 1666600000:
      return harmonyAddressBook.tokens;
    case 42161:
      return arbitrumAddressBook.tokens;
    case 42220:
      return celoAddressBook.tokens;
    case 1285:
      return moonriverAddressBook.tokens;
    case 25:
      return cronosAddressBook.tokens;
    case 1313161554:
      return auroraAddressBook.tokens;
    case 122:
      return fuseAddressBook.tokens;
    case 1088:
      return metisAddressBook.tokens;
    case 1284:
      return moonbeamAddressBook.tokens;
    case 42262:
      return emeraldAddressBook.tokens;
    default:
      throw new Error(
        `Create address book for chainId(${chainId}) first. Check out https://github.com/beefyfinance/address-book`
      );
  }
};

export const getNetworkBurnTokens = () => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 56:
      return {
        [bscAddressBook.tokens.PERA.symbol]: bscAddressBook.tokens.PERA,
        [bscAddressBook.tokens.GUARD.symbol]: bscAddressBook.tokens.GUARD,
        [bscAddressBook.tokens.PEAR.symbol]: bscAddressBook.tokens.PEAR,
        [bscAddressBook.tokens.SING.symbol]: bscAddressBook.tokens.SING,
      };
    case 128:
      return {};
    case 43114:
      return {
        [avaxAddressBook.tokens.SHIBX.symbol]: avaxAddressBook.tokens.SHIBX,
        [avaxAddressBook.tokens.aSING.symbol]: avaxAddressBook.tokens.aSING,
        [avaxAddressBook.tokens.MEAD.symbol]: avaxAddressBook.tokens.MEAD,
      };
    case 137:
      return {
        //  [polygonAddressBook.tokens.xYELD.symbol]: polygonAddressBook.tokens.xYELD,
        [polygonAddressBook.tokens.PEAR.symbol]: polygonAddressBook.tokens.PEAR,
        //  [polygonAddressBook.tokens.pSING.symbol]: polygonAddressBook.tokens.pSING,
      };
    case 250:
      return {
        [fantomAddressBook.tokens.fSING.symbol]: fantomAddressBook.tokens.fSING,
        [fantomAddressBook.tokens.PEAR.symbol]: fantomAddressBook.tokens.PEAR,
      };
    case 1666600000:
      return {};
    case 42161:
      return {};
    case 42220:
      return {};
    case 1285:
      return {};
    case 25:
      return {};
    case 1313161554:
      return {};
    case 122:
      return {};
    case 1088:
      return {};
    case 1284:
      return {};
    case 42262:
      return {};
    default:
      throw new Error(`Create address book for this chainId first.`);
  }
};

export const getNetworkZaps = () => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 56:
      return bscZaps;
    case 128:
      return hecoZaps;
    case 43114:
      return avalancheZaps;
    case 137:
      return polygonZaps;
    case 250:
      return fantomZaps;
    case 1666600000:
      return harmonyZaps;
    case 42161:
      return arbitrumZaps;
    case 42220:
      return celoZaps;
    case 1285:
      return moonriverZaps;
    case 25:
      return cronosZaps;
    case 1313161554:
      return auroraZaps;
    case 122:
      return fuseZaps;
    case 1088:
      return metisZaps;
    case 1284:
      return moonbeamZaps;
    case 42262:
      return emeraldZaps;
    default:
      return [];
  }
};

export const getNetworkStables = () => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 56:
      return [
        'BUSD',
        'USDT',
        'USDC',
        'DAI',
        'VAI',
        'QUSD',
        'UST',
        'VENUS BLP',
        '3EPS',
        'fUSDT',
        '4BELT',
        'IRON',
        'DOLLY',
        'TUSD',
        'USDN',
        'WUSD',
        'USDO',
        'USDD',
      ];
    case 128:
      return ['USDT', 'HUSD'];
    case 43114:
      return [
        'USDT',
        'DAI',
        'BUSD',
        'zDAI',
        'zUSDT',
        'USDTe',
        'BUSDe',
        'USDC',
        'USDCe',
        'DAIe',
        'MAI',
        'FRAX',
        'nUSD',
        'MIM',
        'USDC',
        'UST',
        'USTw',
      ];
    case 137:
      return [
        'USDC',
        'USDT',
        'maUSDC',
        'DAI',
        'IRON',
        'MAI',
        'FRAX',
        'rUSD',
        'UST',
        'USTw',
        'WUSD',
        'jEUR',
        'jGBP',
        'jCHF',
        'EURt',
        'TUSD',
        'PAR',
        'EURS',
        '4EUR',
        'agEUR',
        'jJPY',
        'JPYC',
        'jCAD',
        'CADC',
        'jSGD',
        'XSGD',
      ];
    case 250:
      return [
        'USDC',
        'USDT',
        'DAI',
        'fUSDT',
        'MIM',
        'FRAX',
        'MAI',
        'DOLA',
        'TUSD',
        'UST',
        'USTw',
        'asUSDC',
        'LAMBDA',
        'DEI',
        'TOR',
        'USDB',
      ];
    case 1666600000:
      return ['BUSD', 'bscBUSD', 'USDC', 'USDT', 'UST', 'DAI', 'FRAX'];
    case 42161:
      return ['USDC', 'USDT', 'MIM', 'FRAX', 'UST', 'USTw', 'EURS'];
    case 42220:
      return ['cUSD', 'cEUR', 'DAI', 'USDC', 'USDT'];
    case 1285:
      return ['USDC', 'USDT', 'DAI', 'BUSD', 'MAI', 'MIM', 'FRAX'];
    case 25:
      return ['USDC', 'USDT', 'DAI', 'BUSD'];
    case 1313161554:
      return ['USDC', 'USDT'];
    case 122:
      return ['fUSD', 'BUSD', 'USDC'];
    case 1088:
      return ['mUSDT', 'mUSDC'];
    case 1284:
      return ['USDC', 'USDT', 'DAI', 'BUSD'];
    case 42262:
      return ['ceUSDC, USDT'];
    default:
      return [];
  }
};

export const getNetworkMulticall = () => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 56:
      return '0xB94858b0bB5437498F5453A16039337e5Fdc269C';
    case 128:
      return '0x2776CF9B6E2Fa7B33A37139C3CB1ee362Ff0356e';
    case 43114:
      return '0x6FfF95AC47b586bDDEea244b3c2fe9c4B07b9F76';
    case 137:
      return '0xC3821F0b56FA4F4794d5d760f94B812DE261361B';
    case 250:
      return '0xC9F6b1B53E056fd04bE5a197ce4B2423d456B982';
    case 1666600000:
      return '0xBa5041B1c06e8c9cFb5dDB4b82BdC52E41EA5FC5';
    case 42161:
      return '0x13aD51a6664973EbD0749a7c84939d973F247921';
    case 42220:
      return '0xa9E6E271b27b20F65394914f8784B3B860dBd259';
    case 1285:
      return '0x7f6fE34C51d5352A0CF375C0Fbe03bD19eCD8460';
    case 25:
      return '0x13aD51a6664973EbD0749a7c84939d973F247921';
    case 1313161554:
      return '0x55f46144bC62e9Af4bAdB71842B62162e2194E90';
    case 122:
      return '0x4f22BD7CE44b0e0B2681A28e300A7285319de3a0';
    case 1088:
      return '0x4fd2e1c2395dc088F36cab06DCe47F88A912fC85';
    case 1284:
      return '0xC9F6b1B53E056fd04bE5a197ce4B2423d456B982';
    case 42262:
      return '0xFE40f6eAD11099D91D51a945c145CFaD1DD15Bb8';
    default:
      return '';
  }
};

export const getNetworkConnectors = t => {
  switch (window.REACT_APP_NETWORK_ID) {
    case 56:
      return {
        network: 'binance',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
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
          'custom-clover-bsc': {
            display: {
              logo: require(`images/wallets/clover.png`),
              name: 'Clover Wallet',
              description: t('Connect with your Clover wallet and earn CLV'),
            },
            options: {
              supportedChainIds: [56],
            },
            package: CloverConnector,
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);
              await provider.activate();
              return provider.getProvider();
            },
          },
          'custom-binance': {
            display: {
              name: 'Binance',
              description: t('Binance Chain Wallet'),
              logo: require(`images/wallets/binance-wallet.png`),
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
              logo: require(`images/wallets/math-wallet.svg`),
            },
            package: 'math',
            connector: connectors.injected,
          },
          'custom-twt': {
            display: {
              name: 'Trust',
              description: t('Trust Wallet'),
              logo: require(`images/wallets/trust-wallet.svg`),
            },
            package: 'twt',
            connector: connectors.injected,
          },
          'custom-safepal': {
            display: {
              name: 'SafePal',
              description: t('SafePal App'),
              logo: require(`images/wallets/safepal-wallet.svg`),
            },
            package: 'safepal',
            connector: connectors.injected,
          },
          'custom-cb-bsc': {
            display: {
              logo: require(`images/wallets/coinbase.png`),
              name: 'Coinbase Wallet',
              description: t('Connect to your Coinbase Wallet'),
            },
            options: {
              appName: 'Beefy Finance',
              appLogoUrl: 'https://app.beefy.finance/static/media/BIFI.e797b2e4.png',
              darkMode: false,
            },
            package: WalletLink,
            connector: async (ProviderPackage, options) => {
              const walletLink = new ProviderPackage(options);

              const provider = walletLink.makeWeb3Provider('https://bsc-dataseed.binance.org/', 56);

              await provider.enable();

              return provider;
            },
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 128:
      return {
        network: 'heco',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          // walletconnect: {
          //   package: WalletConnectProvider,
          //   options: {
          //     rpc: {
          //       1: 'https://http-mainnet.hecochain.com',
          //       128: 'https://http-mainnet.hecochain.com',
          //     },
          //   },
          // },
          'custom-clover-heco': {
            display: {
              logo: require(`images/wallets/clover.png`),
              name: 'Clover Wallet',
              description: t('Connect with your Clover wallet and earn CLV'),
            },
            options: {
              supportedChainIds: [128],
            },
            package: CloverConnector,
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);
              await provider.activate();
              return provider.getProvider();
            },
          },
          'custom-math': {
            display: {
              name: 'Math',
              description: t('Math Wallet'),
              logo: require(`images/wallets/math-wallet.svg`),
            },
            package: 'math',
            connector: connectors.injected,
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 43114:
      return {
        network: 'avalanche',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-avax': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://api.avax.network/ext/bc/C/rpc',
                43114: 'https://api.avax.network/ext/bc/C/rpc',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
          'custom-cb-avalanche': {
            display: {
              logo: require(`images/wallets/coinbase.png`),
              name: 'Coinbase Wallet',
              description: t('Connect to your Coinbase Wallet'),
            },
            options: {
              appName: 'Beefy Finance',
              appLogoUrl: 'https://app.beefy.finance/static/media/BIFI.e797b2e4.png',
              darkMode: false,
            },
            package: WalletLink,
            connector: async (ProviderPackage, options) => {
              const walletLink = new ProviderPackage(options);

              const provider = walletLink.makeWeb3Provider(
                'https://api.avax.network/ext/bc/C/rpc',
                43114
              );

              await provider.enable();

              return provider;
            },
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 137:
      return {
        network: 'polygon',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              network: 'matic',
              rpc: {
                1: 'https://polygon-rpc.com/',
                137: 'https://polygon-rpc.com/',
              },
            },
          },
          'custom-clover-polygon': {
            display: {
              logo: require(`images/wallets/clover.png`),
              name: 'Clover Wallet',
              description: t('Connect with your Clover wallet and earn CLV'),
            },
            options: {
              supportedChainIds: [137],
            },
            package: CloverConnector,
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);
              await provider.activate();
              return provider.getProvider();
            },
          },
          'custom-cb-polygon': {
            display: {
              logo: require(`images/wallets/coinbase.png`),
              name: 'Coinbase Wallet',
              description: t('Connect to your Coinbase Wallet'),
            },
            options: {
              appName: 'Beefy Finance',
              appLogoUrl: 'https://app.beefy.finance/static/media/BIFI.e797b2e4.png',
              darkMode: false,
            },
            package: WalletLink,
            connector: async (ProviderPackage, options) => {
              const walletLink = new ProviderPackage(options);

              const provider = walletLink.makeWeb3Provider('https://polygon-rpc.com/', 137);

              await provider.enable();

              return provider;
            },
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 250:
      return {
        network: 'fantom',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-ftm': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://rpc.ftm.tools/',
                250: 'https://rpc.ftm.tools/',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
          'custom-clover-fantom': {
            display: {
              logo: require(`images/wallets/clover.png`),
              name: 'Clover Wallet',
              description: t('Connect with your Clover wallet and earn CLV'),
            },
            options: {
              supportedChainIds: [250],
            },
            package: CloverConnector,
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);
              await provider.activate();
              return provider.getProvider();
            },
          },
          'custom-cb-ftm': {
            display: {
              logo: require(`images/wallets/coinbase.png`),
              name: 'Coinbase Wallet',
              description: t('Connect to your Coinbase Wallet'),
            },
            options: {
              appName: 'Beefy Finance',
              appLogoUrl: 'https://app.beefy.finance/static/media/BIFI.e797b2e4.png',
              darkMode: false,
            },
            package: WalletLink,
            connector: async (ProviderPackage, options) => {
              const walletLink = new ProviderPackage(options);

              const provider = walletLink.makeWeb3Provider('https://rpc.ftm.tools/', 250);

              await provider.enable();

              return provider;
            },
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 1666600000:
      return {
        network: 'harmony',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-one': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://api.harmony.one/',
                1666600000: 'https://api.harmony.one/',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 42161:
      return {
        network: 'arbitrum',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-arb': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://arb1.arbitrum.io/rpc',
                42161: 'https://arb1.arbitrum.io/rpc',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
          'custom-cb-arb': {
            display: {
              logo: require(`images/wallets/coinbase.png`),
              name: 'Coinbase Wallet',
              description: t('Connect to your Coinbase Wallet'),
            },
            options: {
              appName: 'Beefy Finance',
              appLogoUrl: 'https://app.beefy.finance/static/media/BIFI.e797b2e4.png',
              darkMode: false,
            },
            package: WalletLink,
            connector: async (ProviderPackage, options) => {
              const walletLink = new ProviderPackage(options);

              const provider = walletLink.makeWeb3Provider('https://arb1.arbitrum.io/rpc', 42161);

              await provider.enable();

              return provider;
            },
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 1285:
      return {
        network: 'moonriver',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-mr': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://rpc.moonriver.moonbeam.network',
                1285: 'https://rpc.moonriver.moonbeam.network',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
        },
      };
    case 42220:
      return {
        network: 'celo',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-valora': {
            display: {
              logo: require(`images/wallets/valora.png`),
              name: 'Valora',
              description: t('Connects to Valora, a mobile payments app that works worldwide'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://forno.celo.org',
                42220: 'https://forno.celo.org',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
          'custom-wc-celo': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://forno.celo.org',
                42220: 'https://forno.celo.org',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
        },
      };
    case 25:
      return {
        network: 'cronos',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-cdc': {
            display: {
              logo: require(`images/wallets/crypto.png`),
              name: 'Crypto.com',
              description: t('Crypto.com | Wallet Extension'),
            },
            options: {
              supportedChainIds: [25],
              rpc: {
                25: 'https://evm.cronos.org', // cronos mainet
              },
              pollingInterval: 15000,
            },
            package: DeFiConnector,
            connector: async (packageConnector, options) => {
              const connector = new packageConnector({
                name: 'Cronos',
                supprtedChainTypes: ['eth'],
                supportedChainTypes: ['eth'],
                eth: options,
                cosmos: null,
              });
              await connector.activate();

              return connector.getProvider();
            },
          },
          'custom-wc-cronos': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://evm.cronos.org',
                25: 'https://evm.cronos.org',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
        },
      };
    case 122:
      return {
        network: 'fuse',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-fuseCash': {
            display: {
              logo: require(`images/wallets/fusecash.png`),
              name: 'Fuse.Cash',
              description: t('Connect to your Fuse.Cash Wallet'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://rpc.fuse.io',
                122: 'https://rpc.fuse.io',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
          'custom-wc-fuse': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://rpc.fuse.io',
                122: 'https://rpc.fuse.io',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
          'custom-bitkeep': {
            display: {
              name: 'BitKeep Wallet',
              description: 'Connect your BitKeep Wallet',
              logo: require(`images/wallets/bitkeep-wallet.png`),
            },
            package: 'bitkeep',
            connector: connectors.injected,
          },
        },
      };
    case 1088:
      return {
        network: 'metis',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'MetaMask',
            },
          },
          'custom-wc-metis': {
            display: {
              logo: require(`images/wallets/wallet-connect.svg`),
              name: 'Wallet Connect',
              description: t('Scan your WalletConnect to Connect'),
            },
            package: WalletConnectProvider,
            options: {
              rpc: {
                1: 'https://andromeda.metis.io/?owner=1088',
                1088: 'https://andromeda.metis.io/?owner=1088',
              },
            },
            connector: async (ProviderPackage, options) => {
              const provider = new ProviderPackage(options);

              await provider.enable();

              return provider;
            },
          },
        },
      };
    case 1313161554:
      return {
        network: 'aurora',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'Injected',
              description: t('Home-BrowserWallet'),
            },
          },
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: 'https://mainnet.aurora.dev',
              1313161554: 'https://mainnet.aurora.dev',
            },
          },
          connector: async (ProviderPackage, options) => {
            const provider = new ProviderPackage(options);

            await provider.enable();

            return provider;
          },
        },
      };
    case 1284:
      return {
        network: 'moonbeam',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'Injected',
              description: t('Home-BrowserWallet'),
            },
          },
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: 'https://rpc.api.moonbeam.network',
              1284: 'https://rpc.api.moonbeam.network',
            },
          },
          connector: async (ProviderPackage, options) => {
            const provider = new ProviderPackage(options);

            await provider.enable();

            return provider;
          },
        },
      };
    case 42262:
      return {
        network: 'emerald',
        cacheProvider: true,
        providerOptions: {
          injected: {
            display: {
              name: 'Injected',
              description: t('Home-BrowserWallet'),
            },
          },
          package: WalletConnectProvider,
          options: {
            rpc: {
              1: 'https://emerald.oasis.dev',
              42262: 'https://emerald.oasis.dev',
            },
          },
          connector: async (ProviderPackage, options) => {
            const provider = new ProviderPackage(options);

            await provider.enable();

            return provider;
          },
        },
      };
    default:
      return {};
  }
};

export const getNetworkTxUrl = networkTxUrls[window.REACT_APP_NETWORK_ID];
export const getNetworkFriendlyName = (networkId = window.REACT_APP_NETWORK_ID) =>
  networkFriendlyName[networkId];
export const getNetworkBuyUrl = (networkId = window.REACT_APP_NETWORK_ID) =>
  networkBuyUrls[networkId];
export const getNetworkAppUrl = (networkId = window.REACT_APP_NETWORK_ID) =>
  window.location.protocol +
  '//' +
  window.location.host +
  window.location.pathname +
  '#' +
  allNetworks.find(n => n.id === networkId)?.hash;

export const launchpools = getNetworkLaunchpools();
export const vaults = getNetworkVaults();
