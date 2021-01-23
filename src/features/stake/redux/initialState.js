import { erc20ABI, govPoolABI } from '../../configure/abi';

const wbnbPoolAddress = '0x55bB4FF561CE7d328Ed10af322A14dc9c972f653';
const ethPoolAddress = '0x50013DA75AC4224B5c49fe197bfaf68C16E19d6E';
const linkPoolAddress = '0x44bBCa30AEa5f2D226668c197053Db3FA9eC9771';
const creamPoolAddress = '0x38191ea2A077D86B3dF410379F8c0Bb130683116';
const busdLpPoolAddress = '0x1263F0BFfE2D740Ea3279416D0e84943B66958eb';
const spartaLpPoolAddress = '0x2b8C4aD8053b7933CFde936F16aBc55BB5F694c6';
const bifiPoolAddress = '0x453D4Ba9a2D594314DF88564248497F7D74d6b2C';

const pools = [
  {
    id: 'wbnb',
    name: 'WBNB',
    brief: 'Wrapped BNB',
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    abi: erc20ABI,
    rewardsAddress: wbnbPoolAddress,
    rewardsABI: govPoolABI,
    rewardsSymbol: 'BIFI',
    decimals: 18,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
  },
  {
    id: 'eth',
    name: 'ETH',
    brief: 'Ethereum Token',
    address: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    abi: erc20ABI,
    rewardsAddress: ethPoolAddress,
    rewardsABI: govPoolABI,
    rewardsSymbol: 'BIFI',
    decimals: 18,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
  },
  {
    id: 'link',
    name: 'LINK',
    brief: 'Ethereum Token',
    address: '0xF8A0BF9cF54Bb92F17374d9e9A321E6a111a51bD',
    abi: erc20ABI,
    rewardsAddress: linkPoolAddress,
    rewardsABI: govPoolABI,
    rewardsSymbol: 'BIFI',
    decimals: 18,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
  },
  {
    id: 'cream',
    name: 'CREAM',
    brief: 'Ethereum Token',
    address: '0xd4CB328A82bDf5f03eB737f37Fa6B370aef3e888',
    abi: erc20ABI,
    rewardsAddress: creamPoolAddress,
    rewardsABI: govPoolABI,
    rewardsSymbol: 'BIFI',
    decimals: 18,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
  },
  {
    id: 'bnb-busd',
    name: 'BNB-BUSD',
    brief: 'LP BSCSwap',
    address: '0x1EbF0eE99971c6269062C3b480e8e23B7A74756B',
    abi: erc20ABI,
    rewardsAddress: busdLpPoolAddress,
    rewardsABI: govPoolABI,
    rewardsSymbol: 'BIFI',
    decimals: 18,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
  },
  {
    id: 'bnb-sparta',
    name: 'BNB-SPARTA',
    brief: 'LP BSCSwap',
    address: '0x7270Fd3Bfe698Db8bE63B9e63c28fA0bCb3AED8C',
    abi: erc20ABI,
    rewardsAddress: spartaLpPoolAddress,
    rewardsABI: govPoolABI,
    rewardsSymbol: 'BIFI',
    decimals: 18,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
  },
  {
    id: 'bifi',
    name: 'BIFI',
    brief: 'beefy.finance',
    address: '0xCa3F508B8e4Dd382eE878A314789373D80A5190A',
    abi: erc20ABI,
    rewardsAddress: bifiPoolAddress,
    rewardsABI: govPoolABI,
    rewardsSymbol: 'WBNB',
    decimals: 18,
    stakedBalance: 0,
    rewardsAvailable: 0,
    tvl: 0,
  },
];

const initialState = {
	pools,
	fetchPoolsInfoPending: false
};

export default initialState;
