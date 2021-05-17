import React from 'react';
import { useParams } from 'react-router';

import Disclaimer from 'components/Disclaimer/Disclaimer';
import PoolDetails from './components/PoolDetails/PoolDetails';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

export default function VaultDetailsPage() {
  const { vaultId } = useParams();
  return (
    <>
      <ScrollToTop />
      <Disclaimer />
      <PoolDetails vaultId={vaultId} />
    </>
  );
}
