export const networkSettings = {
  56: {
    chainId: `0x${parseInt(56, 10).toString(16)}`,
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  128: {
    chainId: `0x${parseInt(128, 10).toString(16)}`,
    chainName: 'HECO Mainnet',
    nativeCurrency: {
      name: 'Huobi Token',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorerUrls: ['https://hecoinfo.com/'],
  },
  43114: {
    chainId: `0x${parseInt(43114, 10).toString(16)}`,
    chainName: 'Avalanche C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/'],
  },
  137: {
    chainId: `0x${parseInt(137, 10).toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  250: {
    chainId: `0x${parseInt(250, 10).toString(16)}`,
    chainName: 'Fantom Opera',
    nativeCurrency: {
      name: 'FTM',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.ftm.tools'],
    blockExplorerUrls: ['https://ftmscan.com/'],
  },
  1666600000: {
    chainId: `0x${parseInt(1666600000, 10).toString(16)}`,
    chainName: 'Harmony One',
    nativeCurrency: {
      name: 'ONE',
      symbol: 'ONE',
      decimals: 18,
    },
    rpcUrls: ['https://api.s0.t.hmny.io/'],
    blockExplorerUrls: ['https://explorer.harmony.one/'],
  },
  42161: {
    chainId: `0x${parseInt(42161, 10).toString(16)}`,
    chainName: 'Arbitrum One',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io/'],
  },
  42220: {
    chainId: `0x${parseInt(42220, 10).toString(16)}`,
    chainName: 'Celo',
    nativeCurrency: {
      name: 'CELO',
      symbol: 'CELO',
      decimals: 18,
    },
    rpcUrls: ['https://forno.celo.org'],
    blockExplorerUrls: ['https://explorer.celo.org/'],
  },
  1285: {
    chainId: `0x${parseInt(1285, 10).toString(16)}`,
    chainName: 'Moonriver',
    nativeCurrency: {
      name: 'Moonriver',
      symbol: 'MOVR',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.moonriver.moonbeam.network'],
    blockExplorerUrls: ['https://moonriver.moonscan.io/'],
  },
  25: {
    chainId: `0x${parseInt(25, 10).toString(16)}`,
    chainName: 'Cronos',
    nativeCurrency: {
      name: 'CRO',
      symbol: 'CRO',
      decimals: 18,
    },
    rpcUrls: ['https://evm.cronos.org'],
    blockExplorerUrls: ['https://cronos.crypto.org/explorer/'],
  },
  122: {
    chainId: `0x${parseInt(122, 10).toString(16)}`,
    chainName: 'Fuse',
    nativeCurrency: {
      name: 'FUSE',
      symbol: 'FUSE',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.fuse.io'],
    blockExplorerUrls: ['https://explorer.fuse.io/'],
  },
  1088: {
    chainId: `0x${parseInt(1088, 10).toString(16)}`,
    chainName: 'Metis',
    nativeCurrency: {
      name: 'METIS',
      symbol: 'METIS',
      decimals: 18,
    },
    rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
    blockExplorerUrls: ['https://andromeda-explorer.metis.io/'],
  },
  1313161554: {
    chainId: `0x${parseInt(1313161554, 10).toString(16)}`,
    chainName: 'Aurora Mainnet',
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.aurora.dev'],
    blockExplorerUrls: ['https://explorer.mainnet.aurora.dev/'],
  },
  1284: {
    chainId: `0x${parseInt(1284, 10).toString(16)}`,
    chainName: 'Moonbeam',
    nativeCurrency: {
      name: 'GLMR',
      symbol: 'GLMR',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.api.moonbeam.network'],
    blockExplorerUrls: ['https://moonscan.io/'],
  },
  42262: {
    chainId: `0x${parseInt(42262, 10).toString(16)}`,
    chainName: 'Oasis Emerald',
    nativeCurrency: {
      name: 'Oasis Protocol',
      symbol: 'ROSE',
      decimals: 18,
    },
    rpcUrls: ['https://emerald.oasis.dev'],
    blockExplorerUrls: ['https://explorer.emerald.oasis.dev/'],
  },
};

export const networkSetup = chainId => {
  return new Promise((resolve, reject) => {
    const provider = window.ethereum;
    if (provider) {
      if (networkSettings.hasOwnProperty(chainId)) {
        provider
          .request({
            method: 'wallet_addEthereumChain',
            params: [networkSettings[chainId]],
          })
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`No network settings configured for chainId: '${chainId}'`));
      }
    } else {
      reject(new Error(`window.ethereum is '${typeof provider}'`));
    }
  });
};

export const getRpcUrl = () => {
  const settings = networkSettings[window.REACT_APP_NETWORK_ID];
  return settings.rpcUrls[~~(settings.rpcUrls.length * Math.random())];
};
