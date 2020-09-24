import { fetchGasPrice } from '.';

export const depositEth = async ({web3, address, amount, contractAddress}) => {
  const gasPrice = await fetchGasPrice();
  return new Promise((resolve, reject) => {
    console.log(`
      address:${address}\n
      contractAddress:${contractAddress}\n
      gasPrice:${gasPrice}\n
      amount:${amount}
    `)
    web3.eth.sendTransaction({
      from: address,
      to: contractAddress,
      value: amount,
      gasPrice,
      gasLimit: 300000
    })
    .on('transactionHash', function(hash){
      resolve(hash)
    })
    .on('error', error => reject(error));
  })
}