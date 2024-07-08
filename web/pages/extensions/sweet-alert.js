import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const SweetAlert = dynamic(() => import('../../modules/Extensions/SweetAlerts'), {
  loading: () => <PageLoader />,
});

const SweetAlertPage = () => (
  <SecurePage>
    <SweetAlert />
  </SecurePage>
);

export default SweetAlertPage;
