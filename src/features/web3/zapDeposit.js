import { beefyUniV2ZapABI } from '../configure';
import { enqueueSnackbar } from '../common/redux/actions';

export const zapDeposit = async ({
  web3,
  address,
  vaultAddress,
  isETH,
  tokenAddress,
  tokenAmount,
  zapAddress,
  swapAmountOutMin,
  dispatch,
}) => {
  const contract = new web3.eth.Contract(beefyUniV2ZapABI, zapAddress);
  const data = await _zapDeposit({
    contract,
    address,
    vaultAddress,
    isETH,
    tokenAddress,
    tokenAmount,
    swapAmountOutMin,
    dispatch,
  });
  return data;
};

const _zapDeposit = ({
  contract,
  address,
  vaultAddress,
  isETH,
  tokenAddress,
  tokenAmount,
  swapAmountOutMin,
  dispatch,
}) => {
  let transaction;

  if (isETH) {
    console.log('beefInETH(vaultAddress, swapAmountOutMin)', vaultAddress, swapAmountOutMin);
    transaction = contract.methods.beefInETH(vaultAddress, swapAmountOutMin).send({
      from: address,
      value: tokenAmount,
    });
  } else {
    console.log(
      'beefIn(vaultAddress, swapAmountOutMin, tokenAddress, tokenAmount)',
      vaultAddress,
      swapAmountOutMin,
      tokenAddress,
      tokenAmount
    );
    transaction = contract.methods
      .beefIn(vaultAddress, swapAmountOutMin, tokenAddress, tokenAmount)
      .send({
        from: address,
      });
  }

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
