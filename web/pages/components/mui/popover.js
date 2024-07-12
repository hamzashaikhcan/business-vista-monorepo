import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const PopOver = dynamic(() => import('../../../modules/Components/MuiComponents/Popover'), {
  loading: () => <PageLoader />,
});

const PopOverPage = () => (
  <SecurePage>
    <PopOver />
  </SecurePage>
);

export default PopOverPage;
