import React from 'react';

import PoolList from 'features/vault/components/PoolList.js';
import Disclaimer from '../../components/Disclaimer/Disclaimer';

export default function HomePage() {
  return (
    <>
      <Disclaimer />
      <PoolList fromPage="home" />
    </>
  );
}
