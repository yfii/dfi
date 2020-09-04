import Web3 from "web3";
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { HOME_INITIALIZE_BEGIN, HOME_INITIALIZE_SUCCESS, HOME_INITIALIZE_FAILURE } from './constants';

export function initialize() {
  return async dispatch => {
    dispatch({type: HOME_INITIALIZE_BEGIN})
    const { ethereum } = window;
    if(ethereum){
      const web3 = new Web3(ethereum);
      let accounts = '';
      let address = '';
      if (ethereum.isMetaMask && ethereum.request) {
        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        address = accounts[0];
      } else {
        accounts = await web3.eth.getAccounts();
        address = accounts[0];
      }
      dispatch({type: HOME_INITIALIZE_SUCCESS, data: {web3, address}}) 
      if (!ethereum.on) { 
        console.log("provider.on")
        return;
      };
      ethereum.on("disconnect", async () => {
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
          await web3.currentProvider.close();
        }
        dispatch({type: HOME_INITIALIZE_SUCCESS, data: {web3:null, address:''}});
      });
      ethereum.on("accountsChanged", async (accounts) => {
        accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        address = accounts[0];
        dispatch({type: HOME_INITIALIZE_SUCCESS, data: {web3, address}});
      });
    } else {
      dispatch({ type: HOME_INITIALIZE_FAILURE })
    }
  };
}

export function useWallet() {
  const dispatch = useDispatch();
  const {web3, address, initializePending} = useSelector(state => ({
    web3:state.home.web3,
    address:state.home.address,
    initializePending:state.home.initializePending,
  }), shallowEqual);
  const boundAction = useCallback(data => dispatch(initialize(data)), [dispatch]);

  return { web3, address,initializePending, initialize: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_INITIALIZE_BEGIN:
      return {
        ...state,
        initializePending: true
      };

    case HOME_INITIALIZE_SUCCESS:
      return {
        ...state,
        web3: action.data.web3,
        address: process.env.ACCOUNT ? process.env.ACCOUNT : action.data.address,
        initializePending: false
      };
    case HOME_INITIALIZE_FAILURE:
      return {
        ...state,
        initializePending: false
      };

    default:
      return state;
  }
}