import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Progressbar = dynamic(() => import('../../../modules/Components/CorematComponents/ProgressBarDemo'), {
  loading: () => <PageLoader />,
});

const ProgressbarPage = () => (
  <SecurePage>
    <Progressbar />
  </SecurePage>
);

export default ProgressbarPage;
