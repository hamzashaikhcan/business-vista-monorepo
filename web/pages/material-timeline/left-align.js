import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const LeftAligned = dynamic(() => import('../../modules/views/MaterialTimelines/LeftAlign'), {
  loading: () => <PageLoader />,
});

const LeftAlignedTimeline = () => (
  <SecurePage>
    <LeftAligned />
  </SecurePage>
);

export default LeftAlignedTimeline;
