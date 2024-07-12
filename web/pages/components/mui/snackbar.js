import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Snackbar = dynamic(() => import('../../../modules/Components/MuiComponents/Snackbar'), {
  loading: () => <PageLoader />,
});

const SnackbarPage = () => (
  <SecurePage>
    <Snackbar />
  </SecurePage>
);

export default SnackbarPage;
