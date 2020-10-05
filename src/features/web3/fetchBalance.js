import { erc20ABI } from '../configure';
import BigNumber from 'bignumber.js';

export const fetchBalance = async ({ web3, address, tokenAddress }) => {
  if (!tokenAddress) {
    const ethBalance = await web3.eth.getBalance(address);
    return ethBalance;
  }

  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const balance = await contract.methods.balanceOf(address).call({ from: address });

  return new BigNumber(balance).toNumber();
};
