import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Paper = dynamic(() => import('../../../modules/Components/MuiComponents/Paper'), {
  loading: () => <PageLoader />,
});

const PaperPage = () => (
  <SecurePage>
    <Paper />
  </SecurePage>
);

export default PaperPage;
