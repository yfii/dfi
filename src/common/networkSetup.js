const networkSettings = {
  '56': {
    chainId: '0x38',
    chainName: 'BSC Mainnet',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  '128': {
    chainId: '0x80',
    chainName: 'HECO Mainnet',
    nativeCurrency: {
      name: 'Huobi Token',
      symbol: 'HT',
      decimals: 18,
    },
    rpcUrls: ['https://http-mainnet.hecochain.com'],
    blockExplorerUrls: ['https://scan.hecochain.com/'],
  },
  '43114': {
    chainId: '0xa86a',
    chainName: 'Avalanche C-Chain',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  }
}

export const networkSetup = (chainId) => {
    return new Promise((resolve, reject) => {
      const provider = window.ethereum
      if (provider) {
        if (networkSettings.hasOwnProperty(chainId)) {
          provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkSettings[chainId]]
          }).then(resolve).catch(reject)
        } else {
          reject(new Error(`No network settings configured for chainId: '${chainId}'`))
        }
      } else {
        reject(new Error(`window.ethereum is '${typeof provider}'`))
      }
    })
  }

export const getRpcUrl = () => {
  const settings = networkSettings[process.env.REACT_APP_NETWORK_ID];
  return settings.rpcUrls[0];
};
