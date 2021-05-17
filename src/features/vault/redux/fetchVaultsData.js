import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import BigNumber from 'bignumber.js';
import { MultiCall } from 'eth-multicall';
import {
  VAULT_FETCH_VAULTS_DATA_BEGIN,
  VAULT_FETCH_VAULTS_DATA_SUCCESS,
  VAULT_FETCH_VAULTS_DATA_FAILURE,
} from './constants';
import { fetchPrice, whenPricesLoaded } from '../../web3';
import { erc20ABI, vaultABI } from '../../configure';
import { byDecimals } from 'features/helpers/bignumber';
import { getNetworkMulticall } from 'features/helpers/getNetworkData';
import Web3 from 'web3';
import { getRpcUrl } from 'common/networkSetup';

export function fetchVaultsData({ web3, pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_VAULTS_DATA_BEGIN,
    });

    if (!web3) {
      // setup default provider to get vault data
      web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl()));
    }

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, getNetworkMulticall());
      const vaultCalls = pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);
        return {
          pricePerFullShare: vault.methods.getPricePerFullShare(),
          tvl: vault.methods.balance(),
        };
      });

      Promise.all([
        multicall.all([vaultCalls]).then(result => result[0]),
        whenPricesLoaded(), // need to wait until prices are loaded in cache
      ])
        .then(data => {
          const newPools = pools.map((pool, i) => {
            const pricePerFullShare = byDecimals(data[0][i].pricePerFullShare, 18).toNumber();
            return {
              pricePerFullShare: new BigNumber(pricePerFullShare).toNumber() || 1,
              tvl: byDecimals(data[0][i].tvl, pool.tokenDecimals).toNumber(),
              oraclePrice: fetchPrice({ id: pool.oracleId }) || 0,
            };
          });
          dispatch({
            type: VAULT_FETCH_VAULTS_DATA_SUCCESS,
            data: newPools,
          });
          resolve();
        })
        .catch(error => {
          dispatch({
            type: VAULT_FETCH_VAULTS_DATA_FAILURE,
          });
          reject(error.message || error);
        });
    });

    return promise;
  };
}

export function useFetchVaultsData() {
  const dispatch = useDispatch();

  const { pools, fetchVaultsDataDone } = useSelector(
    state => ({
      pools: state.vault.pools,
      fetchVaultsData: state.vault.fetchVaultsData,
      fetchVaultsDataDone: state.vault.fetchVaultsDataDone,
    }),
    shallowEqual
  );

  const boundAction = useCallback(
    data => {
      return dispatch(fetchVaultsData(data));
    },
    [dispatch]
  );

  return {
    pools,
    fetchVaultsData: boundAction,
    fetchVaultsDataDone,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case VAULT_FETCH_VAULTS_DATA_BEGIN:
      return {
        ...state,
        fetchVaultsDataPending: true,
      };

    case VAULT_FETCH_VAULTS_DATA_SUCCESS:
      const pools = state.pools.map((pool, i) => ({
        ...pool,
        ...action.data[i],
      }));

      return {
        ...state,
        pools,
        fetchVaultsDataPending: false,
        fetchVaultsDataDone: true,
      };

    case VAULT_FETCH_VAULTS_DATA_FAILURE:
      return {
        ...state,
        fetchVaultsDataPending: false,
      };

    default:
      return state;
  }
}
