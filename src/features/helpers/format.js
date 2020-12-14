export const formatApy = (apy, fallbackApy) => {
  if (!apy) {
    apy = fallbackApy;
  }
  apy *= 100;

  const order = Math.floor(Math.log10(apy) / 3);
  const units = ['', 'k', 'M', 'B', 'T'];
  const num = apy / 1000 ** order;

  return `${num.toFixed(2)}${units[order]}%`;
};

export const formatTvl = (tvl, oraclePrice, fallbackPrice) => {
  // TODO: bignum?
  tvl *= oraclePrice || fallbackPrice;

  const order = Math.floor(Math.log10(tvl) / 3);
  if (order < 0) {
    return '$0.00';
  }

  const units = ['', 'k', 'M', 'B', 'T'];
  const num = tvl / 1000 ** order;
  const prefix = oraclePrice === 0 ? '~$' : '$';

  return prefix + num.toFixed(2) + units[order];
};

export const formatGlobalTvl = (tvl) => formatTvl(tvl, 1, 1);

export const calcDaily = (apy, fallbackApy) => {
  if (!apy) {
    apy = fallbackApy;
  }

  const g = Math.pow(10, Math.log10(apy + 1) / 365) - 1;
  if (isNaN(g)) {
    return '- %';
  }

  return `${(g * 100).toFixed(2)}%`;
};
