import Web3 from "web3";
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { HOME_CONNECT_WALLET_BEGIN, HOME_CONNECT_WALLET_SUCCESS, HOME_CONNECT_WALLET_FAILURE } from './constants';
import { disconnectWallet } from './actions';

export function connectWallet(web3Modal) {
  return dispatch => {
    dispatch({ type: HOME_CONNECT_WALLET_BEGIN });

    const promise = new Promise(async (resolve, reject) => {
      try {
        const provider = await web3Modal.connect();
        
        const web3 = new Web3(provider);
        if (!provider.on) { 
          console.log("provider.on")
          return;
        };
        provider.on("disconnect", () => {
          console.log("provider.disconnect")
          dispatch(disconnectWallet());
        });
        provider.on("accountsChanged", async (accounts) => {
          console.log("provider.accountsChanged")
          dispatch({type: HOME_CONNECT_WALLET_SUCCESS, data: {web3, address: accounts[0]}});
        });
        provider.on("chainChanged", async () => {
          console.log("provider.chainChanged")
        });
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];
        dispatch({type: HOME_CONNECT_WALLET_SUCCESS, data: {web3, address}})
        resolve()
      } catch (error) {
        dispatch({ type: HOME_CONNECT_WALLET_FAILURE });
        console.log(error.message || error)
        reject();
      }
    });
    return promise;
  };
}

export function useConnectWallet() {
  const dispatch = useDispatch();
  const {web3, address,connectWalletPending} = useSelector(state => ({
    web3:state.home.web3,
    address:state.home.address,
    connectWalletPending:state.home.connectWalletPending,
  }), shallowEqual);
  const boundAction = useCallback(data => dispatch(connectWallet(data)), [dispatch]);

  return { web3, address,connectWalletPending, connectWallet: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CONNECT_WALLET_BEGIN:
      return {
        ...state,
        connectWalletPending: true
      };

    case HOME_CONNECT_WALLET_SUCCESS:
      return {
        ...state,
        web3: action.data.web3,
        address: process.env.ACCOUNT ? process.env.ACCOUNT : action.data.address,
        connectWalletPending: false
      };
    case HOME_CONNECT_WALLET_FAILURE:
      return {
        ...state,
        connectWalletPending: false
      };

    default:
      return state;
  }
}