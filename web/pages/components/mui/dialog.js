import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Dialog = dynamic(() => import('../../../modules/Components/MuiComponents/Dialog'), {
  loading: () => <PageLoader />,
});

const DialogPage = () => (
  <SecurePage>
    <Dialog />
  </SecurePage>
);

export default DialogPage;
