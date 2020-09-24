import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";

export const approval = async ({web3, address, tokenAddress, contractAddress}) => {
  // console.log(`=====================================approval begin=====================================`)
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  // console.log(`
  //   address:${address}\n
  //   tokenAddress:${tokenAddress}\n
  //   contractAddress:${contractAddress}\n
  //   amount:${web3.utils.toWei('79228162514', "ether")}
  // `)
  await contract.methods.approve(
    contractAddress, web3.utils.toWei('79228162514', "ether")
  ).send(
    { from: address }
  )
  // console.log(`=====================================approval success=====================================`)
  return new BigNumber(79228162514).toNumber();
}