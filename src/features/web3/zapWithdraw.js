import { beefyUniV2ZapABI } from '../configure';
import { enqueueSnackbar } from '../common/redux/actions';

export const zapWithdraw = async ({
  web3,
  address,
  vaultAddress,
  amount,
  zapAddress,
  dispatch,
}) => {
  console.log('beefOut(vaultAddress, amount)', vaultAddress, amount);

  const contract = new web3.eth.Contract(beefyUniV2ZapABI, zapAddress);
  const transaction = contract.methods.beefOut(vaultAddress, amount).send({
    from: address,
  });

  return promisifyTransaction(transaction, dispatch);
};

export const zapWithdrawAndSwap = async ({
  web3,
  address,
  vaultAddress,
  amount,
  zapAddress,
  tokenOut,
  amountOutMin,
  dispatch,
}) => {
  console.log(
    'beefOutAndSwap(vaultAddress, amount, tokenOut, amountOutMin)',
    vaultAddress,
    amount,
    tokenOut,
    amountOutMin
  );

  const contract = new web3.eth.Contract(beefyUniV2ZapABI, zapAddress);
  const transaction = contract.methods
    .beefOutAndSwap(vaultAddress, amount, tokenOut, amountOutMin)
    .send({
      from: address,
    });

  return promisifyTransaction(transaction, dispatch);
};

const promisifyTransaction = (transaction, dispatch) => {
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
