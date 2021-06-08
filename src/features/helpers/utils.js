let trimReg = /(^\s*)|(\s*$)/g;

export function isEmpty(key) {
  if (key === undefined || key === '' || key === null) {
    return true;
  }
  if (typeof key === 'string') {
    key = key.replace(trimReg, '');
    return key === '' || key === null || key === 'null' || key === undefined || key === 'undefined';
  } else if (typeof key === 'undefined') {
    return true;
  } else if (typeof key == 'object') {
    for (let i in key) {
      return false;
    }
    return true;
  } else if (typeof key == 'boolean') {
    return false;
  }
}

export const shouldHideFromHarvest = vaultName => {
  // FIXME: hidden until we implement an 'advanced' toggle
  // return HarvestBlacklistVaultIds.includes(vaultName);
  return true;
};

// const HarvestBlacklistVaultIds = [
//   'bifi-maxi',
//   'fortube-fil',
//   'fortube-atom',
//   'fortube-xtz',
//   'fortube-busd',
//   'fortube-link',
//   'fortube-dot',
//   'fortube-usdt',
//   'fortube-eth',
//   'fortube-btcb',
//   'fry-burger-v2',
// ];
