import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const AdminLead = dynamic(() => import('../../modules/Dashboards/Crypto'), {
  loading: () => <PageLoader />,
});

const AdminLeads = () => (
  <SecurePage>
    <AdminLead />
  </SecurePage>
);

export default AdminLeads;
