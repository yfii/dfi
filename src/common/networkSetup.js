const networkSettings = {
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
    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  },
  137: {
    chainId: `0x${parseInt(137, 10).toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
    blockExplorerUrls: ['https://explorer.matic.network/'],
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
};

const networkTxUrls = {
  56: hash => `https://bscscan.com/tx/${hash}`,
  128: hash => `https://hecoinfo.com/tx/${hash}`,
  43114: hash => `https://cchain.explorer.avax.network/tx/${hash}/token-transfers`,
  137: hash => `https://explorer-mainnet.maticvigil.com/tx/${hash}/token-transfers`,
  250: hash => `https://ftmscan.com/tx/${hash}`,
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
  const settings = networkSettings[process.env.REACT_APP_NETWORK_ID];
  return settings.rpcUrls[0];
};

export const getTxUrl = networkTxUrls[process.env.REACT_APP_NETWORK_ID];
