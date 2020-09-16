import BigNumber from "bignumber.js";

export const fetchAllowance = async ({web3, address, contract, contractAddress}) => {
  // console.log(`=====================================fetchAllowance begin=====================================`)
  // const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  //   contract:${contract}\n
  // `)
  if (!contract) { return 79228162514}
  const balance = await contract.methods.allowance(address, contractAddress).call({ from: address });
  const allowance = web3.utils.fromWei(balance, "ether");

  // console.log(allowance)
  // console.log(`=====================================fetchAllowance success=====================================`)
  return new BigNumber(allowance).toNumber();
}