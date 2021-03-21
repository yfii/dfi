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

export function fetchVaultsData({ address, web3, pools }) {
  return dispatch => {
    dispatch({
      type: VAULT_FETCH_VAULTS_DATA_BEGIN,
    });

    if (!web3) {
      // setup default provider to get vault data
      web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org'));
    }

    const promise = new Promise((resolve, reject) => {
      const multicall = new MultiCall(web3, getNetworkMulticall());

      let tokenCalls = [];
      if (address) { // can only fetch allowances if a wallet is connected
        tokenCalls = pools.map(pool => {
          const bnbShimAddress = '0xC72E5edaE5D7bA628A2Acb39C8Aa0dbbD06daacF';
          const token = new web3.eth.Contract(erc20ABI, pool.tokenAddress || bnbShimAddress);
          return {
            allowance: token.methods.allowance(address, pool.earnContractAddress),
          };
        });
      }

      const vaultCalls = pools.map(pool => {
        const vault = new web3.eth.Contract(vaultABI, pool.earnedTokenAddress);
        return {
          pricePerFullShare: vault.methods.getPricePerFullShare(),
          tvl: vault.methods.balance(),
        };
      });

      Promise.all([
        multicall.all([tokenCalls]).then(result => result[0]),
        multicall.all([vaultCalls]).then(result => result[0]),
        whenPricesLoaded() // need to wait until prices are loaded in cache
      ]).then(data => {
        const newPools = pools.map((pool, i) => {
          const allowance = data[0][1] ? web3.utils.fromWei(data[0][i].allowance, 'ether') : 0;
          const pricePerFullShare = byDecimals(data[1][i].pricePerFullShare, 18).toNumber();
          return {
            ...pool,
            allowance: new BigNumber(allowance).toNumber() || 0,
            pricePerFullShare: new BigNumber(pricePerFullShare).toNumber() || 1,
            tvl: byDecimals(data[1][i].tvl, 18).toNumber(),
            oraclePrice: fetchPrice({ id: pool.oracleId }) || 0,
          };
        });
        dispatch({
          type: VAULT_FETCH_VAULTS_DATA_SUCCESS,
          data: newPools,
        });
        resolve();
      }).catch(error => {
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
      return {
        ...state,
        pools: action.data,
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
