const poolWarningMap = {
  liquidity: 'Vault-LiquidityWarningTitle',
  lending: 'Vault-LendingWarningTitle',
  generalWarning: 'Vault-GeneralWarningTitle'
};

export const getPoolWarning = key => {
  if (key in poolWarningMap) {
    const warning = poolWarningMap[key];
    return warning;
  } else {
    return poolWarningMap['generalWarning'];
  }
};
