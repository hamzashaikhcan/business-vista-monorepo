import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const BottomNavigation = dynamic(() => import('../../../modules/Components/MuiComponents/BottomNavigations'), {
  loading: () => <PageLoader />,
});

const BottomNavigationPage = () => (
  <SecurePage>
    <BottomNavigation />
  </SecurePage>
);

export default BottomNavigationPage;
