import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Fab = dynamic(() => import('../../../modules/Components/MuiComponents/FloatingActionButton'), {
  loading: () => <PageLoader />,
});

const FabPage = () => (
  <SecurePage>
    <Fab />
  </SecurePage>
);

export default FabPage;
