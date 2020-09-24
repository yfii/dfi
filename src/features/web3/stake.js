export const statke = async ({contract, address, amount, gasPrice}) => {
  return contract.methods.stake(amount).send({ from: address, gasPrice })
}