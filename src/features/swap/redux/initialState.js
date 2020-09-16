const tokens = [
  {
    name: 'BUSD',
    description: 'Binance USD',
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'busd.curve.fi',
        type: 'zap'
      }
    ]
  },
  {
    name: 'DAI',
    description: 'DAI Stablecoin',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'zap'
      },
      {
        name: 'busd.curve.fi',
        type: 'zap'
      }
    ]
  },
  {
    name: 'USDC',
    description: 'USD//C',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    decimals: 6,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'zap'
      },
      {
        name: 'busd.curve.fi',
        type: 'zap'
      }
    ]
  },
  {
    name: 'USDT',
    description: 'Tether USD',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    decimals: 6,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'zap'
      },
      {
        name: 'busd.curve.fi',
        type: 'zap'
      }
    ]
  },
  {
    name: 'TUSD',
    description: 'TrueUSD',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'zap'
      }
    ]
  },
  {
    name: 'compound.curve.fi',
    description: 'compound.curve.fi',
    erc20address: '0x3740fb63ab7a09891d7c0d4299442a551d06f5fd',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'swap'
      }
    ]
  },
  {
    name: 'usdt.curve.fi',
    description: 'usdt.curve.fi',
    erc20address: '0x9fc689ccada600b6df723d9e47d84d76664a1f23',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'swap'
      }
    ]
  },
  {
    name: 'y.curve.fi',
    description: 'y.curve.fi',
    erc20address: '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'DAI',
        type: 'zap'
      },
      {
        name: 'USDC',
        type: 'zap'
      },
      {
        name: 'USDT',
        type: 'zap'
      },
      {
        name: 'TUSD',
        type: 'zap'
      },
      {
        name: 'busd.curve.fi',
        type: 'swap',
        needTUSD: true
      }
    ]
  },
  {
    name: 'busd.curve.fi',
    description: 'busd.curve.fi',
    erc20address: '0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'BUSD',
        type: 'zap'
      },
      {
        name: 'DAI',
        type: 'zap'
      },
      {
        name: 'USDC',
        type: 'zap'
      },
      {
        name: 'USDT',
        type: 'zap'
      }
    ]
  }
]

const initialState = {
  tokens,
  fetchBalancesPending: false
};

export default initialState;