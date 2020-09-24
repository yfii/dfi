import { yCurveZapABI, yCurveZapOutABI, yCurveZapV4ABI, yCurveZapOutV4ABI, yCurveZapSwapABI, yCurveZapSwapV4ABI } from "../../configure";

const yCurveZapAddress = '0xb227ea4F19257B838d34d7d390E209A83e590D71'
const yCurveZapOutAddress = '0xF2fF83844ffBa41b4Ebbf31296f9bb638107364B'
const yCurveZapV4Address = '0xFdedC6e02108B4cb53BbeAC4E041Dec94334C29e'
const yCurveZapOutV4Address = '0xDf09EFbEfC94d360e1D232Ad5b2d8Ed66c6A9642'
const yCurveZapSwapAddress = '0x53f05A51cF87AC0AFFc67a52D8110fFe824580AD'
const yCurveZapSwapV4Address = '0x500B508C847492E549842438DB4Cfc5666b8B7D4'


const allowance = [
  {
    name: 'BUSD',
    address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    pools: [{
      name: 'yCurveZapV4Address',
      address: yCurveZapV4Address,
      allowance: 0,
    }]
  },
  {
    name: 'DAI',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    pools: [{
      name: 'yCurveZapAddress',
      address: yCurveZapAddress,
      allowance: 0,
    },{
      name: 'yCurveZapV4Address',
      address: yCurveZapV4Address,
      allowance: 0,
    }]
  },
  {
    name: 'USDC',
    address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    pools: [{
      name: 'yCurveZapAddress',
      address: yCurveZapAddress,
      allowance: 0,
    },{
      name: 'yCurveZapV4Address',
      address: yCurveZapV4Address,
      allowance: 0,
    }]
  },
  {
    name: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    pools: [{
      name: 'yCurveZapAddress',
      address: yCurveZapAddress,
      allowance: 0,
    },{
      name: 'yCurveZapV4Address',
      address: yCurveZapV4Address,
      allowance: 0,
    }]
  },
  {
    name: 'TUSD',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    pools: [{
      name: 'yCurveZapAddress',
      address: yCurveZapAddress,
      allowance: 0,
    }]
  },
  {
    name: 'compound.curve.fi',
    address: '0x3740fb63ab7a09891d7c0d4299442a551d06f5fd',
    pools: [{
      name: 'yCurveZapSwapAddress',
      address: yCurveZapSwapAddress,
      allowance: 0,
    }]
  },
  {
    name: 'usdt.curve.fi',
    address: '0x9fc689ccada600b6df723d9e47d84d76664a1f23',
    pools: [{
      name: 'yCurveZapSwapAddress',
      address: yCurveZapSwapAddress,
      allowance: 0,
    }]
  },
  {
    name: 'y.curve.fi',
    address: '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8',
    pools: [{
      name: 'yCurveZapOutAddress',
      address: yCurveZapOutAddress,
      allowance: 0,
    },{
      name: 'yCurveZapSwapV4Address',
      address: yCurveZapSwapV4Address,
      allowance: 0,
    }]
  },
  {
    name: 'busd.curve.fi',
    address: '0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B',
    pools: [{
      name: 'yCurveZapSwapV4Address',
      address: yCurveZapSwapV4Address,
      allowance: 0,
    }]
  }
]

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
        type: 'zap',
        contract: {
          name: 'yCurveZapV4Address',
          address: yCurveZapV4Address,
          abi: yCurveZapV4ABI,
          call: 'depositBUSD'
        },
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
        type: 'zap',
        contract: {
          name: 'yCurveZapAddress',
          address: yCurveZapAddress,
          abi: yCurveZapABI,
          call: "depositDAI"
        }
      },
      {
        name: 'busd.curve.fi',
        type: 'zap',
        contract: {
          name: 'yCurveZapV4Address',
          address: yCurveZapV4Address,
          abi: yCurveZapV4ABI,
          call: "depositDAI"
        }
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
        type: 'zap',
        contract: {
          name: 'yCurveZapAddress',
          address: yCurveZapAddress,
          abi: yCurveZapABI,
          call: "depositUSDC"
        }
      },
      {
        name: 'busd.curve.fi',
        type: 'zap',
        contract: {
          name: 'yCurveZapV4Address',
          address: yCurveZapV4Address,
          abi: yCurveZapV4ABI,
          call: "depositUSDC"
        }
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
        type: 'zap',
        contract: {
          name: 'yCurveZapAddress',
          address: yCurveZapAddress,
          abi: yCurveZapABI,
          call: "depositUSDT"
        }
      },
      {
        name: 'busd.curve.fi',
        type: 'zap',
        contract: {
          name: 'yCurveZapV4Address',
          address: yCurveZapV4Address,
          abi: yCurveZapV4ABI,
          call: "depositUSDT"
        }
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
        type: 'zap',
        contract: {
          name: 'yCurveZapAddress',
          address: yCurveZapAddress,
          abi: yCurveZapABI,
          call: "depositTUSD"
        }
      }
    ]
  },
  {
    name: 'compound.curve.fi',
    description: 'compound.curve.fi',
    address: '0x3740fb63ab7a09891d7c0d4299442a551d06f5fd',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'swap',
        contract: {
          name: 'yCurveZapSwapAddress',
          address: yCurveZapSwapAddress,
          abi: yCurveZapSwapABI,
          call: "swapv1tov3"
        }
      }
    ]
  },
  {
    name: 'usdt.curve.fi',
    description: 'usdt.curve.fi',
    address: '0x9fc689ccada600b6df723d9e47d84d76664a1f23',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'y.curve.fi',
        type: 'swap',
        contract: {
          name: 'yCurveZapSwapAddress',
          address: yCurveZapSwapAddress,
          abi: yCurveZapSwapABI,
          call: "swapv2tov3"
        }
      }
    ]
  },
  {
    name: 'y.curve.fi',
    description: 'y.curve.fi',
    address: '0xdf5e0e81dff6faf3a7e52ba697820c5e32d806a8',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'DAI',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutAddress',
          address: yCurveZapOutAddress,
          abi: yCurveZapOutABI,
          call: "withdrawDAI"
        }
      },
      {
        name: 'USDC',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutAddress',
          address: yCurveZapOutAddress,
          abi: yCurveZapOutABI,
          call: "withdrawUSDC"
        }
      },
      {
        name: 'USDT',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutAddress',
          address: yCurveZapOutAddress,
          abi: yCurveZapOutABI,
          call: "withdrawUSDT"
        }
      },
      {
        name: 'TUSD',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutAddress',
          address: yCurveZapOutAddress,
          abi: yCurveZapOutABI,
          call: "withdrawTUSD"
        }
      },
      {
        name: 'busd.curve.fi',
        type: 'swap',
        contract: {
          name: 'yCurveZapSwapV4Address',
          address: yCurveZapSwapV4Address,
          abi: yCurveZapSwapV4ABI,
          call: "swapv3tov4"
        },
        needTUSD: true
      }
    ]
  },
  {
    name: 'busd.curve.fi',
    description: 'busd.curve.fi',
    address: '0x3B3Ac5386837Dc563660FB6a0937DFAa5924333B',
    decimals: 18,
    balance: 0,
    receivableList:[
      {
        name: 'BUSD',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutV4Address',
          address: yCurveZapOutV4Address,
          abi: yCurveZapOutV4ABI,
          call: "withdrawBUSD"
        }
      },
      {
        name: 'DAI',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutV4Address',
          address: yCurveZapOutV4Address,
          abi: yCurveZapOutV4ABI,
          call: "withdrawDAI"
        }
      },
      {
        name: 'USDC',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutV4Address',
          address: yCurveZapOutV4Address,
          abi: yCurveZapOutV4ABI,
          call: "withdrawUSDC"
        }
      },
      {
        name: 'USDT',
        type: 'zap',
        contract: {
          name: 'yCurveZapOutV4Address',
          address: yCurveZapOutV4Address,
          abi: yCurveZapOutV4ABI,
          call: "withdrawUSDT"
        }
      }
    ]
  }
]

const initialState = {
  allowance,
  tokens,
  fetchBalancesPending: false,
  checkApprovalPending: false,
  fetchApprovalPending: false,
  fetchZapOrSwapPending: false
};

export default initialState;