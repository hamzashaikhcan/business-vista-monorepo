import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Intranet = dynamic(() => import('../../modules/Dashboards/Intranet'), {
  loading: () => <PageLoader />,
});

const IntranetDashboard = () => (
  <SecurePage>
    <Intranet />
  </SecurePage>
);

export default IntranetDashboard;
