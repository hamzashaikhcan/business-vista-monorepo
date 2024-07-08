import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Popper = dynamic(() => import('../../../modules/Components/MuiComponents/Popper'), {
  loading: () => <PageLoader />,
});

const PopperPage = () => (
  <SecurePage>
    <Popper />
  </SecurePage>
);

export default PopperPage;
