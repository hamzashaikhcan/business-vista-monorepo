import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const SpeedDial = dynamic(() => import('../../../modules/Components/MuiComponents/SpeedDial'), {
  loading: () => <PageLoader />,
});

const SpeedDialPage = () => (
  <SecurePage>
    <SpeedDial />
  </SecurePage>
);

export default SpeedDialPage;
