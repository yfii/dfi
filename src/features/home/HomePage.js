import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import SectionPools from 'features/vault/sections/SectionPools.js';
import StakePage from 'features/stake/sections/StakePools.js';
import FarmPools from 'features/farm/sections/FarmPools';

export default function HomePage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <FarmPools fromPage='home' />
      <SectionPools fromPage='home' />
      <StakePage fromPage='home' />
    </>
  );
}
