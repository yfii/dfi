import React, { useEffect } from 'react';

import SectionPools from 'features/vault/sections/SectionPools.js';
import StakePage from 'features/stake/sections/StakePools.js';
import Disclaimer from '../../components/Disclaimer/Disclaimer';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <Disclaimer />
      <SectionPools fromPage="home" />
      <StakePage fromPage="home" />
    </>
  );
}
