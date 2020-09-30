import React, { useEffect } from 'react';
import Disclaimer from '../../components/Disclaimer/Disclaimer';
import SectionPools from './sections/SectionPools';

export default function VaultPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <Disclaimer />
      <SectionPools />
    </>
  );
}
