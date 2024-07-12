import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const LeftAlign = dynamic(() => import('../../modules/views/CustomTimelines/LeftAlign'), {
  loading: () => <PageLoader />,
});

const LeftAlignTimeline = () => (
  <SecurePage>
    <LeftAlign />
  </SecurePage>
);

export default LeftAlignTimeline;
