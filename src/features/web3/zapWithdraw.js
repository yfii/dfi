import { beefyUniV2ZapABI } from '../configure';
import { enqueueSnackbar } from '../common/redux/actions';

export const zapWithdraw = async ({ web3, address, vaultAddress, amount, zapAddress, dispatch }) => {
  const contract = new web3.eth.Contract(beefyUniV2ZapABI, zapAddress);
  const data = await _zapWithdraw({ contract, address, vaultAddress, amount, zapAddress, dispatch });
  return data;
};

const _zapWithdraw = ({ contract, address, vaultAddress, amount, dispatch }) => {

  console.log('beefOut(vaultAddress, amount)', vaultAddress, amount);
  const transaction = contract.methods.beefOut(vaultAddress, amount).send({
    from: address,
  })

  return new Promise((resolve, reject) => {
    transaction
      .on('transactionHash', function (hash) {
        console.log(hash);
        dispatch(
          enqueueSnackbar({
            message: hash,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
            hash,
          })
        );
      })
      .on('receipt', function (receipt) {
        console.log(receipt);
        resolve();
      })
      .on('error', function (error) {
        console.log(error);
        reject(error);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
