import { byDecimals } from 'features/helpers/bignumber';

export const fetchPricePerFullShare = async ({address, contract}) => {
  // console.log(`=====================================fetchDepositedBalance begin=====================================`)
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  // `)
  const pricePerFullShare = await contract.methods.getPricePerFullShare().call({ from: address });

  // console.log(`=====================================fetchDepositedBalance success=====================================`)

  return byDecimals(pricePerFullShare, 18).toNumber();
}