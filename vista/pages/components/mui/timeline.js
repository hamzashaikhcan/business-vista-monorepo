import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const TimeLine = dynamic(() => import('../../../modules/Components/MuiComponents/Timeline'), {
  loading: () => <PageLoader />,
});

const TimeLinePage = () => (
  <SecurePage>
    <TimeLine />
  </SecurePage>
);

export default TimeLinePage;
