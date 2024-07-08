import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Portal = dynamic(() => import('../../../modules/Components/MuiComponents/Portal'), {
  loading: () => <PageLoader />,
});

const PortalPage = () => (
  <SecurePage>
    <Portal />
  </SecurePage>
);

export default PortalPage;
