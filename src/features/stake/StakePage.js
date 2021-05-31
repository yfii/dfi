import React from 'react';
import { StakePools } from './sections';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { getNetworkFriendlyName } from '../helpers/getNetworkData';

export default function StakePage() {
  const { t } = useTranslation();
  const networkName = getNetworkFriendlyName();

  return (
    <>
      <Helmet>
        <title>{t('Stakes-Meta-Title', { networkName })}</title>
      </Helmet>
      <StakePools />
    </>
  );
}
