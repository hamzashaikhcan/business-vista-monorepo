import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Modal = dynamic(() => import('../../../modules/Components/MuiComponents/Modal'), {
  loading: () => <PageLoader />,
});

const ModalPage = () => (
  <SecurePage>
    <Modal />
  </SecurePage>
);

export default ModalPage;
