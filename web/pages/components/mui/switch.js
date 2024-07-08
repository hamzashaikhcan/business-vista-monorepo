import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Switch = dynamic(() => import('../../../modules/Components/MuiComponents/Switches'), {
  loading: () => <PageLoader />,
});

const SwitchPage = () => (
  <SecurePage>
    <Switch />
  </SecurePage>
);

export default SwitchPage;
