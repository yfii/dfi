import { getAddress } from '@ethersproject/address';

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
