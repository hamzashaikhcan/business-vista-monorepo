import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const RightAlign = dynamic(() => import('../../modules/views/CustomTimelines/RightAlign'), {
  loading: () => <PageLoader />,
});

const RightAlignTimeline = () => (
  <SecurePage>
    <RightAlign />
  </SecurePage>
);

export default RightAlignTimeline;
