import bscTokenList from 'assets/tokenlists/beefy.bsc.json'
import { abi as pancakeswapAbi } from '@uniswap/v2-periphery/build/IUniswapV2Router02.json'
import { vaultABI as beefyVaultAbi } from 'features/configure/abi'

const pancakeswapRouterAddress = '0x05ff2b0db69458a0750badebc4f9e13add608c7f'

export const bscZaps = [
  {
    id: 'cake-bifi-bnb',
    deposit: [
      {
        title: 'zapSwapBNBForTokens',
        abi: pancakeswapAbi,
        contract: pancakeswapRouterAddress,
        method: 'swapExactETHForTokens',
        args: {
          amountIn: undefined,
          amountOutMin: undefined,
          path: [
            bscTokenList.tokens.find(t => t.symbol == 'WBNB').address,
            bscTokenList.tokens.find(t => t.symbol == 'BIFI').address
          ],
          to: undefined,
          deadline: undefined,
        },
      },
      {
        title: 'zapAddBNBLiqudity',
        abi: pancakeswapAbi,
        contract: pancakeswapRouterAddress,
        method: 'addLiquidityETH',
        args: {
          token: bscTokenList.tokens.find(t => t.symbol == 'BIFI').address,
          amountTokenDesired: undefined,
          amountTokenMin: undefined,
          amountETHMin: undefined,
          to: undefined,
          deadline: undefined,
        },
      },
      {
        title: 'zapDepositLiquidityPair',
        abi: beefyVaultAbi,
        contract: '0x3b5332a476abcdb80cde6645e9e5563435e97772',
        method: 'deposit',
        args: {
          amount: undefined,
        },
      },
    ]
  }
]
