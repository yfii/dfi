import React, { useEffect } from 'react';
import FarmPools from './sections/FarmPools';

export default function FarmPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <FarmPools />
    </>
  );
}
