import React, { useEffect } from 'react';
import { useConnectWallet } from '../../home/redux/hooks';
import { useFetchBalances } from '../redux/hooks';

export default function ZapCommand() {
  const { web3, address } = useConnectWallet();
  const { tokens, fetchBalances } = useFetchBalances();

  useEffect(() => {
    if (address && web3) {
        fetchBalances();
    }
  }, [address, web3, fetchBalances]);

  return (
      <div>
          哈哈
      </div>
  )
}