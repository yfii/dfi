import { earnContractABI } from "../configure";
import { enqueueSnackbar } from '../common/redux/actions';


export const withdrawEth = async ({web3, address,isAll, amount, contractAddress, dispatch}) => {
  // console.log(`=====================================withdraw begin=====================================`)
  // console.log(amount)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  // console.log(`
  //   address:${address}\n
  //   contractAddress:${contractAddress}\n
  //   amount:${web3.utils.toWei(amount, "ether")}
  // `)
  
  // console.log(`=====================================withdraw=====================================`)
  const data = await _withdraw({web3, contract, isAll, amount, address, dispatch});
  // console.log(`=====================================withdraw success=====================================`)
  return data;
}

const _withdraw = ({web3, contract, address,isAll, amount, dispatch}) => {
  return new Promise((resolve, reject) => {
    // console.log(isAll)
    if (isAll) {
      contract.methods.withdrawAllETH().send({ from: address }).on('transactionHash', function(hash){
        console.log(hash)
        dispatch(enqueueSnackbar({
          message: hash,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success'
          },
          hash
        }));
      })
      .on('receipt', function(receipt){
        console.log(receipt);
        resolve()
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
      contract.methods.withdrawETH(amount).send({ from: address }).on('transactionHash', function(hash){
        console.log(hash)
        dispatch(enqueueSnackbar({
          message: hash,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success'
          },
          hash
        }));
      })
      .on('receipt', function(receipt){
        resolve()
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