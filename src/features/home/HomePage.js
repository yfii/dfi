import React, { useEffect } from 'react';

import SectionPools from 'features/vault/sections/SectionPools.js';
import StakePage from 'features/stake/sections/StakePools.js';

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <SectionPools fromPage='home' />
      <StakePage fromPage='home' />
    </>
  );
}
