import React, { useEffect } from 'react';
import SectionTitle from './sections/SectionTitle';
import SectionPools from './sections/SectionPools';

export default function VaultPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <SectionTitle />
      <SectionPools />
    </>
  );
}
