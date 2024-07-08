import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Drawer = dynamic(() => import('../../../modules/Components/CorematComponents/DrawerDemo'), {
  loading: () => <PageLoader />,
});

const DrawerPage = () => (
  <SecurePage>
    <Drawer />
  </SecurePage>
);

export default DrawerPage;
