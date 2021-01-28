const pools = [
  {
    partner: 'TWT',
    symbol: 'TWT',
    address: null,
    abi: null,
    rewardsAddress: null,
    rewardsABI: null,
    rewardsSymbol: 'FRONT',
    decimals: 18,
    balance: 0,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
    rewardRate: 0,
  },
  {
    partner: 'BIFI',
    symbol: 'mooBIFI',
    address: null,
    abi: null,
    rewardsAddress: null,
    rewardsABI: null,
    rewardsSymbol: 'FRONT',
    decimals: 18,
    balance: 0,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
    rewardRate: 0,
  },
];

const initialState = {
  pools,
  fetchPoolsInfoPending: false
};

export default initialState;
