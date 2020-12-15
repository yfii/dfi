import { strategyABI } from '../configure';
import { enqueueSnackbar } from '../common/redux/actions';
import { fetchStrategy } from './fetchStrategy';

export const harvest = async ({ web3, address, vaultContractAddress, dispatch }) => {
  const strategyContractAddress = await fetchStrategy({ web3, contractAddress: vaultContractAddress });
  const strategyContract = new web3.eth.Contract(strategyABI, strategyContractAddress);
  const data = await _harvest({ contract: strategyContract, address, dispatch });
  return data;
};

const _harvest = ({ contract, address, dispatch }) => {
  return new Promise((resolve, reject) => {
    contract.methods
      .harvest()
      .send({ from: address })
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
