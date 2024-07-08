import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const CenterAlign = dynamic(() => import('../../modules/views/CustomTimelines/CenterAlign'), {
  loading: () => <PageLoader />,
});

const CenterAlignTimeline = () => (
  <SecurePage>
    <CenterAlign />
  </SecurePage>
);

export default CenterAlignTimeline;
