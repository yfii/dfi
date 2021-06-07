import ethersAddress from '@ethersproject/address';
const { getAddress } = ethersAddress;

export function isValidChecksumAddress(address) {
  try {
    return address === getAddress(address);
  } catch {}

  return false;
}

export function maybeChecksumAddress(address) {
  try {
    return getAddress(address);
  } catch {}

  return false;
}
