import React from 'react';
import Disclaimer from 'components/Disclaimer/Disclaimer';
import PoolList from './components/Pools';

export default function VaultPage() {
  return (
    <>
      <Disclaimer />
      <PoolList />
    </>
  );
}
