import { enqueueSnackbar } from '../common/redux/actions';

export const depositEth = async ({web3, address, amount, contractAddress, dispatch}) => {
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
    })
    .on('transactionHash', function(hash){
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
    })
    .catch((error) => {
      console.log(error)
      reject(error)
    })
  })
}