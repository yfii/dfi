import { yCurveFiRewardsABI, balancerRewardsABI, governanceABI, pool4Abi } from "../../configure";

const pools = [
	{
		name: 'YFII',
		description: '',
		token: 'YFII',
		tokenDescription: '',
		tokenDecimals: 18,
		tokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnedToken: 'MEFI',
		earnedTokenDescription: '',
		earnedTokenDecimals: 6,
		earnedTokenAddress: '0x72Cf258c852Dc485a853370171d46B9D29fD3184',
		earnContractAddress: '0x6A77c0c917Da188fBfa9C380f2E60dd223c0c35a',
		earnContractAbi: pool4Abi
	},
	{
		name: 'mefilp',
		description: '',
		token: 'MEFI/ETH',
		tokenDescription: '',
		tokenDecimals: 18,
		tokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnedToken: 'MEFI',
		earnedTokenDescription: '',
		earnedTokenDecimals: 6,
		earnedTokenAddress: '0x72Cf258c852Dc485a853370171d46B9D29fD3184',
		earnContractAddress: '0x6CA21695CB12A251bB19aE73Bda6964f1BBc48De',
		earnContractAbi: pool4Abi
	},
];

const poolsInfo = [{
	staked: 0,
	tvl: 0,
	apy: 0,
},{
	staked: 0,
	tvl: 0,
	apy: 0,
},{
	staked: 0,
	tvl: 0,
	apy: 0,
},{
	staked: 0,
	tvl: 0,
	apy: 0,
}]

const allowance = [0,0,0,0];
const balance = [0,0,0,0];
const currentlyStaked = [0,0,0,0];
const rewardsAvailable = [0,0,0,0];


const initialState = {
	pools,
	allowance,
	currentlyStaked,
	rewardsAvailable,
	balance,
	poolsInfo,
	fetchPoolsInfoPending: false,
	checkApprovalPending: [false,false,false,false],
	fetchBalancePending: [false,false,false,false],
	fetchCurrentlyStakedPending: [false,false,false,false],
	fetchRewardsAvailablePending: [false,false,false,false],
	fetchApprovalPending: [false,false,false,false],
	fetchStakePending: [false,false,false,false],
	fetchWithdrawPending: [false,false,false,false],
	fetchClaimPending: [false,false,false,false],
	fetchExitPending: [false,false,false,false]
};

export default initialState;