import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const fetchBalance = async ({web3, address, tokenAddress }) => {
  // console.log(`=====================================fetchBalance begin=====================================`)
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress)
  // console.log(`
  //   address:${address}\n
  //   tokenAddress:${tokenAddress}\n
  // `)
  // 0xdAC17F958D2ee523a2206206994597C13D831ec7 地址为usdt
  const balance = await contract.methods.balanceOf(address).call({ from: address });
  // console.log(balance)
  // console.log(`=====================================fetchBalance success=====================================`)

  return new BigNumber(balance).toNumber();
}