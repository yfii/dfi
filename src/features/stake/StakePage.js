import React, { useEffect } from 'react';
import StakePools from './sections/StakePools';

export default function StakePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <StakePools />
    </>
  );
}
