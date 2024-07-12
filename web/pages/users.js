import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../authentication/auth-page-wrappers/SecurePage';

const Users = dynamic(() => import('../modules/modules/Users'), {
  loading: () => <PageLoader />,
});

const ModuleUsers = () => (
  <SecurePage>
    <Users />
  </SecurePage>
);

export default ModuleUsers;
