import BigNumber from 'bignumber.js';

export const fetchAllowance = async ({ web3, address, contract, contractAddress }) => {
  if (!contract) {
    return 80000000000;
  }
  const balance = await contract.methods.allowance(address, contractAddress).call({ from: address });
  const allowance = web3.utils.fromWei(balance, 'ether');
  return new BigNumber(allowance).toNumber();
};
