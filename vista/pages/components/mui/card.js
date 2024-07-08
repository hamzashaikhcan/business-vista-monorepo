import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Card = dynamic(() => import('../../../modules/Components/MuiComponents/Card'), {
  loading: () => <PageLoader />,
});

const CardPage = () => (
  <SecurePage>
    <Card />
  </SecurePage>
);

export default CardPage;
