import React, { useEffect } from 'react';

import StakePools from './sections/StakePools';
import Disclaimer from '../../components/Disclaimer/Disclaimer';

export default function StakePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <Disclaimer />
      <StakePools />
    </>
  );
}
