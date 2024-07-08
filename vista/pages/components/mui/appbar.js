import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const AppBar = dynamic(() => import('../../../modules/Components/MuiComponents/AppBar'), {
  loading: () => <PageLoader />,
});

const AppBarPage = () => (
  <SecurePage>
    <AppBar />
  </SecurePage>
);

export default AppBarPage;
