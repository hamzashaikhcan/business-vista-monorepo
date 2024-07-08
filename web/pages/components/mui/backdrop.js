import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Backdrop = dynamic(() => import('../../../modules/Components/MuiComponents/Backdrop'), {
  loading: () => <PageLoader />,
});

const BackdropPage = () => (
  <SecurePage>
    <Backdrop />
  </SecurePage>
);

export default BackdropPage;
