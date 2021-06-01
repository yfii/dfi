import React from 'react';
import { StakePools } from './sections';
import { Helmet } from 'react-helmet';
import { usePageMeta } from '../common/getPageMeta';

export default function StakePage() {
  const { getPageMeta } = usePageMeta();

  return (
    <>
      <Helmet>
        <title>{getPageMeta('Stakes-Meta-Title')}</title>
        <meta property="og:title" content={getPageMeta('Stakes-Meta-Title')} />
      </Helmet>
      <StakePools />
    </>
  );
}
