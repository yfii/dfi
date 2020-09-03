import { useCallback } from 'react';
import i18next from 'i18next';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { HOME_CREATE_WEB3MODAL } from './constants';

const random = parseInt(Math.random() * Number(process.env.INFURA_RANDOM), 10)
const INFURA_ID = process.env["INFURA_ID_" + random] ? process.env["INFURA_ID_" + random] : process.env.INFURA_ID_0;


export function createWeb3Modal() {
  return dispatch => {
    const web3Modal = new Web3Modal({
      network: process.env.NETWORK ? process.env.NETWORK : "mainet",
      cacheProvider: true,
      providerOptions: {
        injected: {
          display: {
            name: "Injected",
            description: i18next.t('Home-BrowserWallet')
          },
          package: null
        },
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: INFURA_ID
          }
        }
      }
    })
    dispatch({ type: HOME_CREATE_WEB3MODAL, data: web3Modal })
  };
}

export function useWeb3Modal() {
  const dispatch = useDispatch();
  const web3Modal = useSelector(state => state.home.web3Modal, shallowEqual);
  const boundAction = useCallback(() => dispatch(createWeb3Modal()), [dispatch]);

  return { web3Modal, createWeb3Modal: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_CREATE_WEB3MODAL:
      return {
        ...state,
        web3Modal: action.data,
      };

    default:
      return state;
  }
}