import { yCurveZapABI, yCurveZapOutABI, yCurveZapV4ABI, yCurveZapOutV4ABI, yCurveZapSwapABI, yCurveZapSwapV4ABI } from "../../configure";

const pools = [
	{
		name: 'yearn.finance',
		token: 'curve.fi',
		tokenDecimals: 18,
		tokenAddress: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
		earnedToken: 'YFII',
		earnedTokenDecimals: 18,
		earnedTokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnContractAddress: '0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6',
		halfTime: 0
	},
	{
		name: 'Balancer Pool',
		token: 'BPT',
		tokenDecimals: 18,
		tokenAddress: '0x16cAC1403377978644e78769Daa49d8f6B6CF565',
		earnedToken: 'YFII',
		earnedTokenDecimals: 18,
		earnedTokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnContractAddress: '0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6',
		halfTime: 0
	},
	{
		name: 'Governance',
		token: 'yfii',
		tokenDecimals: 18,
		tokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnedToken: 'yCrv',
		earnedTokenDecimals: 18,
		earnedTokenAddress: '0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83',
		earnContractAddress: '0xa8EA49a9e242fFfBdECc4583551c3BcB111456E6',
		halfTime: 0
	},
];

const poolsInfo = [{
	name: "yearn.finance",
	staked: 0,
	tvl: 0,
	pay: 0,
},{
	name: "Balancer Pool",
	staked: 0,
	tvl: 0,
	pay: 0,
},{
	name: "Governance",
	staked: 0,
	tvl: 0,
	pay: 0,
},{
	name: "yfii",
	staked: 0,
	tvl: 0,
	pay: 0,
}]
const allowance = [0,0,0,0];
const balance = [0,0,0,0];
const currentlyStaked = [0,0,0,0];
const rewardsAvailable = [0,0,0,0];
const halfTime = [0,0,false,false]


const initialState = {
	pools,
	allowance,
	currentlyStaked,
	rewardsAvailable,
	halfTime,
	balance,
	poolsInfo,
	checkApprovalPending: false
};

export default initialState;