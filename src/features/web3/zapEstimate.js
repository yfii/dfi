import { BeefyUniV2ZapABI } from 'features/configure';

export const zapEstimate = async ({ web3, zapAddress, vaultAddress, tokenAddress, tokenAmount }) => {
  const contract = new web3.eth.Contract(BeefyUniV2ZapABI, zapAddress);
  const estimate = await contract.methods.estimateSwap(vaultAddress, tokenAddress, tokenAmount).call();
  return estimate; // { swapAmountIn uint256, swapAmountOut uint256, swapTokenOut address }
};
