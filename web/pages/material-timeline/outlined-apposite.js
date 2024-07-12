import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const OutlinedOppositeContent = dynamic(() => import('../../modules/views/MaterialTimelines/OutlinedOppositeContent'), {
  loading: () => <PageLoader />,
});

const OutlinedOppositeContentTimeline = () => (
  <SecurePage>
    <OutlinedOppositeContent />
  </SecurePage>
);

export default OutlinedOppositeContentTimeline;
