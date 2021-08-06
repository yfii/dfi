const retireReasonMap = {
  rewards: 'Vault-DepositsRetiredRewardsTitle',
  exploit: 'Vault-DepositsRetiredExploitTitle',
  tvl: 'Vault-DepositsRetiredTVLTitle',
  noReason: 'Vault-DepositsRetiredTitle',
};

export const getRetireReason = key => {
  if (key in retireReasonMap) {
    const reason = retireReasonMap[key];
    return reason;
  } else {
    return retireReasonMap['noReason'];
  }
};
