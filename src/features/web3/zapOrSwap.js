import { enqueueSnackbar } from '../common/redux/actions';

export const zapOrSwap = async ({web3, address, contract, call, amount, dispatch}) => {
  // console.log(`=====================================deposit begin=====================================`)
  console.log(`
    address:${address}\n
    call:${call}\n
    amount:${amount}
  `)
  const data = await _zapOrSwap({web3, address, contract, call, amount, dispatch});
  // console.log(`=====================================deposit success=====================================`)
  return data;
}

const _zapOrSwap = ({contract, amount, call, address, dispatch}) => {
  return new Promise((resolve, reject) => {
    // console.log(isAll)
    contract.methods[call](amount).send({ from: address }).on('transactionHash', function(hash){
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
  })
}