import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const RightAligned = dynamic(() => import('../../modules/views/MaterialTimelines/RightAlign'), {
  loading: () => <PageLoader />,
});

const RightAlignedTimeline = () => (
  <SecurePage>
    <RightAligned />
  </SecurePage>
);

export default RightAlignedTimeline;
