import BigNumber from 'bignumber.js';

const units = ['', 'k', 'M', 'B', 'T', 'Q', 'Q', 'S', 'S'];

export const formatApy = apy => {
  if (!apy) return `???`;

  apy *= 100;

  const order = apy < 1 ? 0 : Math.floor(Math.log10(apy) / 3);
  if (order >= units.length - 1) return `🔥`;

  const num = apy / 1000 ** order;
  return `${num.toFixed(2)}${units[order]}%`;
};

export const formatPercent = (per, dp = 2) => {
  if (!per) {
    return '0%';
  }

  return stripTrailingZeros((per * 100).toFixed(dp)) + '%';
};

export const formatTvl = (tvl, oraclePrice, useOrder = true) => {
  if (oraclePrice) {
    tvl = BigNumber(tvl).times(oraclePrice).toFixed(2);
  }

  let order = Math.floor(Math.log10(tvl) / 3);
  if (order < 0 || useOrder === false) {
    order = 0;
  }

  const num = tvl / 1000 ** order;

  return '$' + num.toFixed(2) + units[order];
};

export const formatGlobalTvl = tvl => formatTvl(tvl, 1);

export const calcDaily = apy => {
  if (!apy) return `???`;

  const g = Math.pow(10, Math.log10(apy + 1) / 365) - 1;
  if (isNaN(g)) {
    return '- %';
  }

  return `${(g * 100).toFixed(2)}%`;
};

export const formatCountdown = deadline => {
  const time = deadline - new Date().getTime();

  const day = Math.floor(time / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0');
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0');
  const minutes = Math.floor((time / (1000 * 60)) % 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((time / 1000) % 60)
    .toString()
    .padStart(2, '0');

  return `${day}day ${hours}:${minutes}:${seconds}`;
};

export const stripTrailingZeros = str => {
  return str.replace(/(\.[0-9]*?)(0+$)/, '$1').replace(/\.$/, '');
};

export const formatDecimals = (number, maxPlaces = 8) => {
  if (number.isZero()) {
    return '0';
  }

  const places = Math.min(maxPlaces, number >= 10 ? 4 : 8);
  return stripTrailingZeros(number.toFixed(places));
};
