import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Crm = dynamic(() => import('../../modules/Dashboards/Crm'), {
  loading: () => <PageLoader />,
});

const CrmDashboard = () => (
  <SecurePage>
    <Crm />
  </SecurePage>
);

export default CrmDashboard;
