import { pools, erc20Tokens } from '../config'
const initialState = {
	pools,
	erc20Tokens,
	etherBalance: 0,
	poolsInfo: Array(pools.length).fill({staked: 0, tvl: 0, apy: 0}),
};

export default initialState;