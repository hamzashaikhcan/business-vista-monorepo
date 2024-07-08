import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Zigzag = dynamic(() => import('../../modules/views/CustomTimelines/Zigzag'), {
  loading: () => <PageLoader />,
});

const ZigzagTimeline = () => (
  <SecurePage>
    <Zigzag />
  </SecurePage>
);

export default ZigzagTimeline;
