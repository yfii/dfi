export const statke = async ({contract, address, amount}) => {
  return contract.methods.stake(amount).send({ from: address })
}