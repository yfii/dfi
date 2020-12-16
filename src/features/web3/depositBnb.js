import { bnbVaultABI } from '../configure';
import { enqueueSnackbar } from '../common/redux/actions';

export const depositBnb = async ({ web3, address, amount, contractAddress, dispatch }) => {
  const contract = new web3.eth.Contract(bnbVaultABI, contractAddress);
  const data = await _deposit({ web3, contract, amount, address, dispatch });
  return data;
};

const _deposit = ({ web3, contract, amount, address, dispatch }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .depositBNB()
      .send({ from: address, value: amount })
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
