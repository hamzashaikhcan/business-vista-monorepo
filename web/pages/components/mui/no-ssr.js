import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const NoSsr = dynamic(() => import('../../../modules/Components/MuiComponents/NoSsr'), {
  loading: () => <PageLoader />,
});

const NoSsrPage = () => (
  <SecurePage>
    <NoSsr />
  </SecurePage>
);

export default NoSsrPage;
