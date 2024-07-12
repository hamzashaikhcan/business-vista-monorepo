import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ButtonsGroup = dynamic(() => import('../../../modules/Components/MuiComponents/ButtonGroup'), {
  loading: () => <PageLoader />,
});

const ButtonsGroupPage = () => (
  <SecurePage>
    <ButtonsGroup />
  </SecurePage>
);

export default ButtonsGroupPage;
