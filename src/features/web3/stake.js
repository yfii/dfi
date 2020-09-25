import { enqueueSnackbar } from '../common/redux/actions';

export const statke = async ({contract, address, amount, dispatch}) => {
  return new Promise((resolve, reject) => {
  contract.methods.stake(amount).send({ from: address }).on('transactionHash', function(hash){
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