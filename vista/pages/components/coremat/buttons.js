import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Buttons = dynamic(() => import('../../../modules/Components/CorematComponents/ButtonsDemo'), {
  loading: () => <PageLoader />,
});

const ButtonsPage = () => (
  <SecurePage>
    <Buttons />
  </SecurePage>
);

export default ButtonsPage;
