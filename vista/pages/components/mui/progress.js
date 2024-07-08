import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Progress = dynamic(() => import('../../../modules/Components/MuiComponents/Progress'), {
  loading: () => <PageLoader />,
});

const ProgressPage = () => (
  <SecurePage>
    <Progress />
  </SecurePage>
);

export default ProgressPage;
