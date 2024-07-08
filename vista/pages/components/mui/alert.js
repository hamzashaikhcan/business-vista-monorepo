import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Alert = dynamic(() => import('../../../modules/Components/MuiComponents/Alert'), {
  loading: () => <PageLoader />,
});

const AlertPage = () => (
  <SecurePage>
    <Alert />
  </SecurePage>
);

export default AlertPage;
