export const depositEth = async ({web3, address, amount, contractAddress}) => {
  return new Promise((resolve, reject) => {
    console.log(`
      address:${address}\n
      contractAddress:${contractAddress}\n
      amount:${amount}
    `)
    web3.eth.sendTransaction({
      from: address,
      to: contractAddress,
      value: amount,
      gasLimit: 300000
    })
    .on('transactionHash', function(hash){
      resolve(hash)
    })
    .on('error', error => reject(error));
  })
}