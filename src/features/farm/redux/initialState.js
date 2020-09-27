import { yCurveFiRewardsABI, balancerRewardsABI, governanceABI, pool4Abi } from "../../configure";

const pools = [
	{
		name: 'pool4',
		token: 'YFII',
		tokenDecimals: 18,
		tokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnedToken: 'MEFI',
		earnedTokenDecimals: 6,
		earnedTokenAddress: '0x72Cf258c852Dc485a853370171d46B9D29fD3184',
		earnContractAddress: '0x6A77c0c917Da188fBfa9C380f2E60dd223c0c35a',
		earnContractAbi: pool4Abi
	},
	{
		name: 'mefilp',
		token: 'MEFI/ETH',
		tokenDecimals: 18,
		tokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnedToken: 'MEFI',
		earnedTokenDecimals: 6,
		earnedTokenAddress: '0x72Cf258c852Dc485a853370171d46B9D29fD3184',
		earnContractAddress: '0x6CA21695CB12A251bB19aE73Bda6964f1BBc48De',
		earnContractAbi: pool4Abi
	},
];

const poolsInfo = [{
	name: "yearn.finance",
	staked: 0,
	tvl: 0,
	apy: 0,
},{
	name: "Balancer Pool",
	staked: 0,
	tvl: 0,
	apy: 0,
},{
	name: "Governance",
	staked: 0,
	tvl: 0,
	apy: 0,
},{
	name: "pool4",
	staked: 0,
	tvl: 0,
	apy: 0,
}]

const allowance = [0,0,0,0];
const balance = [0,0,0,0];
const currentlyStaked = [0,0,0,0];
const rewardsAvailable = [0,0,0,0];
const halfTime = [0,0,0,0];
const canWithdrawTime = [0,0,0,0];


const initialState = {
	pools,
	allowance,
	currentlyStaked,
	rewardsAvailable,
	halfTime,
	canWithdrawTime,
	balance,
	poolsInfo,
	fetchPoolsInfoPending: false,
	checkApprovalPending: [false,false,false,false],
	fetchBalancePending: [false,false,false,false],
	fetchCurrentlyStakedPending: [false,false,false,false],
	fetchRewardsAvailablePending: [false,false,false,false],
	fetchHalfTimePending: [false,false,false,false],
	fetchCanWithdrawTimePending: [false,false,false,false],
	fetchApprovalPending: [false,false,false,false],
	fetchStakePending: [false,false,false,false],
	fetchWithdrawPending: [false,false,false,false],
	fetchClaimPending: [false,false,false,false],
	fetchExitPending: [false,false,false,false]
};

export default initialState;