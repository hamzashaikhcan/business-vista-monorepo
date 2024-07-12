import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Menu = dynamic(() => import('../../../modules/Components/MuiComponents/Menus'), {
  loading: () => <PageLoader />,
});

const MenuPage = () => (
  <SecurePage>
    <Menu />
  </SecurePage>
);

export default MenuPage;
