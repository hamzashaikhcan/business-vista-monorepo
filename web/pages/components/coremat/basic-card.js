import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const BasicCard = dynamic(() => import('../../../modules/Components/CorematComponents/BasicCardDemo'), {
  loading: () => <PageLoader />,
});

const BasicCardPage = () => (
  <SecurePage>
    <BasicCard />
  </SecurePage>
);

export default BasicCardPage;
