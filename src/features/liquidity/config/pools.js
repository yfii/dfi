import BigNumber from "bignumber.js";

export const pools = [
  {
    name: 'eth/usdt lp',
    earnedToken: 'iETH/USDT',
    token: 'ETH/USDT',
    poolsInfoToken: 'eth-usdt',
    pricePerFullShare: 1,
    tokenLogoList: ["WETH", "USDT"],
    canDepositTokenList: ["eth/usdt lp", "eth", "weth", "usdt"],
    canDepositTokenAllowanceList: Array(4).fill(new BigNumber(0)),
    fetchApprovalPending: Array(4).fill(false),
    tokenDepositFunctionList: ["deposit", "depositETH", "depositToken0", "depositToken1"],
    tokenDepositAllFunctionList: ["depositAll", null, "depositToken0All", "depositToken1All"],
    fetchDepositPending: Array(4).fill(false),
    canWithdrawTokenList: ["eth/usdt lp", "eth", "weth", "usdt"],
    tokenWithdrawFunctionList: ["withdraw", "withdrawETH", "withdrawToken0", "withdrawToken1"],
    tokenWithdrawAllFunctionList: ["withdrawAll", "withdrawETHAll", "withdrawToken0All", "withdrawToken1All"],
    fetchWithdrawPending: Array(4).fill(false),
    contractAddress: "0x7E43210a4c6831D421f57026617Fdfc8ED3A0baf",
    pricePerFullShare: 0,
    pairPriceToken: '0xc509f486e551eeb6e18e7c4e1fbb8ba0348d131c',
    pairPrice: '0',
  }
]