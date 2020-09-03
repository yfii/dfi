import { earnContractABI } from "../configure";
import { fetchGasPrice } from '.';

export const withdraw = async ({web3, address,isAll, amount, contractAddress}) => {
  // console.log(`=====================================withdraw begin=====================================`)
  // console.log(amount)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  const gasPrice = await fetchGasPrice();
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  //   gasPrice:${gasPrice}\n
  //   amount:${web3.utils.toWei(amount, "ether")}
  // `)
  
  // console.log(`=====================================withdraw=====================================`)
  const data = await _withdraw({web3, contract, isAll, amount, address, gasPrice});
  // console.log(`=====================================withdraw success=====================================`)
  return data;
}

const _withdraw = ({web3, contract, address,isAll, amount, gasPrice}) => {
  return new Promise((resolve, reject) => {
    // console.log(isAll)
    if (isAll) {
      contract.methods.withdrawAll().send({ from: address, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
        console.log(hash)
        resolve(hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        console.log(error)
        reject(error)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    } else {
      contract.methods.withdraw(amount).send({ from: address, gasPrice: web3.utils.toWei(gasPrice, 'gwei') }).on('transactionHash', function(hash){
        console.log(hash)
        resolve(hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        console.log(error)
        reject(error)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    }
    
  })
}