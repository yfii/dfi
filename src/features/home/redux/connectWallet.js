import Web3 from 'web3';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_CONNECT_WALLET_BEGIN,
  HOME_CONNECT_WALLET_SUCCESS,
  HOME_CONNECT_WALLET_FAILURE,
  HOME_ACCOUNTS_CHANGED,
  HOME_NETWORK_CHANGED,
} from './constants';
import { disconnectWallet } from './actions';

export function connectWallet(web3Modal) {
  return async dispatch => {
    dispatch({ type: HOME_CONNECT_WALLET_BEGIN });
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      web3.eth.extend({
        methods: [
          {
            name: 'chainId',
            call: 'eth_chainId',
            outputFormatter: web3.utils.hexToNumber,
          },
        ],
      });
      const subscribeProvider = provider => {
        if (!provider.on) {
          return;
        }
        provider.on('close', () => {
          dispatch(disconnectWallet(web3, web3Modal));
        });
        provider.on('disconnect', async () => {
          dispatch(disconnectWallet(web3, web3Modal));
        });
        provider.on('accountsChanged', async accounts => {
          if (accounts[0]) {
            dispatch({ type: HOME_ACCOUNTS_CHANGED, data: accounts[0] });
          } else {
            dispatch(disconnectWallet(web3, web3Modal));
          }
        });
        provider.on('chainChanged', async chainId => {
          const networkId = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
          dispatch({ type: HOME_NETWORK_CHANGED, data: networkId });
        });
      };
      subscribeProvider(provider);

      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      let networkId = await web3.eth.getChainId();
      if (networkId === 86) {
        // Trust provider returns an incorrect chainId for BSC.
        networkId = 56;
      }

      dispatch({ type: HOME_CONNECT_WALLET_SUCCESS, data: { web3, address, networkId } });
    } catch (error) {
      dispatch({ type: HOME_CONNECT_WALLET_FAILURE });
    }
  };
}

export function useConnectWallet() {
  const dispatch = useDispatch();
  const { web3, address, networkId, connected, connectWalletPending } = useSelector(
    state => ({
      web3: state.home.web3,
      address: state.home.address,
      networkId: state.home.networkId,
      connected: state.home.connected,
      connectWalletPending: state.home.connectWalletPending,
    }),
    shallowEqual
  );
  const boundAction = useCallback(data => dispatch(connectWallet(data)), [dispatch]);

  return { web3, address, networkId, connected, connectWalletPending, connectWallet: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CONNECT_WALLET_BEGIN:
      return {
        ...state,
        connectWalletPending: true,
      };

    case HOME_CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        web3: action.data.web3,
        address: process.env.ACCOUNT ? process.env.ACCOUNT : action.data.address,
        networkId: action.data.networkId,
        connected: true,
        connectWalletPending: false,
      };

    case HOME_NETWORK_CHANGED:
      return {
        ...state,
        networkId: action.data,
      };

    case HOME_ACCOUNTS_CHANGED:
      return {
        ...state,
        address: action.data,
      };
    case HOME_CONNECT_WALLET_FAILURE:
      return {
        ...state,
        connectWalletPending: false,
      };

    default:
      return state;
  }
}
