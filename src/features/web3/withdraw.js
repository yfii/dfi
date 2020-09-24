import { earnContractABI } from "../configure";

export const withdraw = async ({web3, address,isAll, amount, contractAddress}) => {
  // console.log(`=====================================withdraw begin=====================================`)
  // console.log(amount)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  //   amount:${web3.utils.toWei(amount, "ether")}
  // `)
  
  // console.log(`=====================================withdraw=====================================`)
  const data = await _withdraw({web3, contract, isAll, amount, address});
  // console.log(`=====================================withdraw success=====================================`)
  return data;
}

const _withdraw = ({web3, contract, address,isAll, amount}) => {
  return new Promise((resolve, reject) => {
    // console.log(isAll)
    if (isAll) {
      contract.methods.withdrawAll().send({ from: address }).on('transactionHash', function(hash){
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
      contract.methods.withdraw(amount).send({ from: address }).on('transactionHash', function(hash){
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