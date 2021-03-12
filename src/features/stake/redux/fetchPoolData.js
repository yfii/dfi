import {useCallback} from 'react';
import BigNumber from "bignumber.js";
import {useDispatch, useSelector} from 'react-redux';
import {
    STAKE_FETCH_POOL_DATA_BEGIN,
    STAKE_FETCH_POOL_DATA_FAILURE,
    STAKE_FETCH_POOL_DATA_SUCCESS,
} from './constants';
import {MooToken} from "../../configure/abi";
import {fetchPrice} from '../../web3';

export function fetchPoolData(index) {
    return (dispatch, getState) => {
        dispatch({
            type: STAKE_FETCH_POOL_DATA_BEGIN,
            index
        });

        return new Promise((resolve, reject) => {
            const {home, stake} = getState();
            const {web3} = home;
            const {pools} = stake;

            const getTotalStaked = async (pool) => {
                const tokenPrice = await fetchPrice({id: pools[index].tokenOracleId});
                const tokenContract = new web3.eth.Contract(pool.earnContractAbi, pool.earnContractAddress);
                let totalStaked = new BigNumber(await tokenContract.methods.totalSupply().call());
                if(pool.isMooStaked) {
                    const mooToken = new web3.eth.Contract(MooToken, pool.tokenAddress);
                    const pricePerShare = new BigNumber(await mooToken.methods.getPricePerFullShare().call());
                    totalStaked = totalStaked.times(pricePerShare).dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals));
                }
                return [
                    totalStaked.dividedBy(new BigNumber(10).exponentiatedBy(pool.tokenDecimals)),
                    totalStaked.times(tokenPrice).dividedBy(new BigNumber(10).exponentiatedBy(pool.earnedTokenDecimals))
                ];
            };

            const getYearlyRewardsInUsd = async (pool) => {
                const tokenPrice = await fetchPrice({id: pool.earnedOracleId});
                const rewardPool = new web3.eth.Contract(pool.earnContractAbi, pool.earnContractAddress);
                const rewardRate = new BigNumber(await rewardPool.methods.rewardRate().call());
                const yearlyRewards = rewardRate.times(3).times(28800).times(365);

                return yearlyRewards.times(tokenPrice).dividedBy(new BigNumber(10).exponentiatedBy(pool.earnedTokenDecimals));
            }

            const getPoolData = async pool => {
                const [yearlyRewardsInUsd, [totalStaked, totalStakedInUsd]] = await Promise.all([
                    getYearlyRewardsInUsd(pool),
                    getTotalStaked(pool),
                ]);

                const data = {
                    apy: Number(yearlyRewardsInUsd.dividedBy(totalStakedInUsd)),
                    staked: totalStaked.toFixed(2),
                    tvl: totalStakedInUsd.toFixed(2)
                }

                dispatch({
                    type: STAKE_FETCH_POOL_DATA_SUCCESS,
                    data: data,
                    index
                });
                resolve(data);
            };

            return getPoolData(pools[index])
        }).catch(() => {
            dispatch({ type: STAKE_FETCH_POOL_DATA_FAILURE });
        });
    }
}

export function useFetchPoolData() {
    const dispatch = useDispatch();
    const { pools, poolData, fetchPoolDataPending } = useSelector(
        state => ({
            pools: state.stake.pools,
            poolData: state.stake.poolData,
            fetchPoolDataPending: state.stake.fetchPoolDataPending,
        })
    );

    const boundAction = useCallback(
        data => dispatch(fetchPoolData(data)),
        [dispatch],
    );

    return {
        pools,
        poolData,
        fetchPoolData: boundAction,
        fetchPoolDataPending
    };
}

export function reducer(state, action) {
    const { poolData, fetchPoolDataPending } = state;
    switch (action.type) {
        case STAKE_FETCH_POOL_DATA_BEGIN:
            // Just after a request is sent
            fetchPoolDataPending[action.index] = true;
            return {
                ...state,
                fetchPoolDataPending,
            };

        case STAKE_FETCH_POOL_DATA_SUCCESS:
            // The request is success
            poolData[action.index] = action.data;
            fetchPoolDataPending[action.index] = false;
            return {
                ...state,
                poolData,
                fetchPoolDataPending,
            };

        case STAKE_FETCH_POOL_DATA_FAILURE:
            // The request is failed
            fetchPoolDataPending[action.index] = false;
            return {
                ...state,
                fetchPoolDataPending,
            };

        default:
            return state;
    }
}