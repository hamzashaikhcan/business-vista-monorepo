import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Timeline = dynamic(() => import('../../../modules/Components/CorematComponents/TimelineDemo'), {
  loading: () => <PageLoader />,
});

const TimelinePage = () => (
  <SecurePage>
    <Timeline />
  </SecurePage>
);

export default TimelinePage;
