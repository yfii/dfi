import { erc20ABI } from "../configure";
import BigNumber from "bignumber.js";
import { enqueueSnackbar } from '../common/redux/actions';

export const approval = ({web3, address, tokenAddress, contractAddress, dispatch}) => {
  // console.log(`=====================================approval begin=====================================`)
  return new Promise((resolve, reject) => {
    const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    // console.log(`
    //   address:${address}\n
    //   tokenAddress:${tokenAddress}\n
    //   contractAddress:${contractAddress}\n
    //   amount:${web3.utils.toWei('79228162514', "ether")}
    // `)
    contract.methods.approve(contractAddress, web3.utils.toWei('79228162514', "ether")).send({ from: address }).on(
      'transactionHash', function(hash){
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
        resolve(new BigNumber(79228162514).toNumber());
      })
      .on('error', function(error) {
        reject(error)
      })
      .catch((error) => {
        reject(error)
      })
  });
  // console.log(`=====================================approval success=====================================`)
}