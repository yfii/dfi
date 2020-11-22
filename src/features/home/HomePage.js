import React from 'react';

import Pools from 'features/vault/components/Pools/Pools';
import Disclaimer from '../../components/Disclaimer/Disclaimer';

export default function HomePage() {
  return (
    <>
      <Disclaimer />
      <Pools fromPage="home" />
    </>
  );
}
