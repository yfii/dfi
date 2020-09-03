import { erc20ABI } from "../configure";
import { fetchGasPrice } from '.';
import BigNumber from "bignumber.js";

export const approval = async ({web3, address, tokenAddress, contractAddress}) => {
  // console.log(`=====================================approval begin=====================================`)
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const gasPrice = await fetchGasPrice();
  // console.log(`
  //   address:${address}\n
  //   tokenAddress:${tokenAddress}\n
  //   contractAddress:${contractAddress}\n
  //   gasPrice:${gasPrice}\n
  //   amount:${web3.utils.toWei('79228162514', "ether")}
  // `)
  await contract.methods.approve(
    contractAddress, web3.utils.toWei('79228162514', "ether")
  ).send(
    { from: address, gasPrice: web3.utils.toWei(gasPrice, 'gwei')}
  )
  // console.log(`=====================================approval success=====================================`)
  return new BigNumber(79228162514).toNumber();
}