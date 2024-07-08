import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ToggleButton = dynamic(() => import('../../../modules/Components/MuiComponents/ToggleButtons'), {
  loading: () => <PageLoader />,
});

const ToggleButtonPage = () => (
  <SecurePage>
    <ToggleButton />
  </SecurePage>
);

export default ToggleButtonPage;
