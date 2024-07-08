import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const CenterWithIcon = dynamic(() => import('../../modules/views/MaterialTimelines/CenterWithIcon'), {
  loading: () => <PageLoader />,
});

const CenterWithIconTimeline = () => (
  <SecurePage>
    <CenterWithIcon />
  </SecurePage>
);

export default CenterWithIconTimeline;
