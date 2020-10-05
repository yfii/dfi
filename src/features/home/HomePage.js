import React from 'react';

import SectionPools from 'features/vault/sections/SectionPools.js';
import Disclaimer from '../../components/Disclaimer/Disclaimer';
import Footer from '../../components/Footer/Footer';
import Pastures from '../../components/Pastures/Pastures';

export default function HomePage() {
  return (
    <>
      <Disclaimer />
      <SectionPools fromPage="home" />
      <Footer />
      <Pastures />
    </>
  );
}
