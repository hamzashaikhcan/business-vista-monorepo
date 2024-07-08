import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Tabs = dynamic(() => import('../../../modules/Components/MuiComponents/Tabs'), {
  loading: () => <PageLoader />,
});

const TabsPage = () => (
  <SecurePage>
    <Tabs />
  </SecurePage>
);

export default TabsPage;
