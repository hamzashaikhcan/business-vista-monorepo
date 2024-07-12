import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Chip = dynamic(() => import('../../../modules/Components/MuiComponents/Chip'), {
  loading: () => <PageLoader />,
});

const ChipPage = () => (
  <SecurePage>
    <Chip />
  </SecurePage>
);

export default ChipPage;
