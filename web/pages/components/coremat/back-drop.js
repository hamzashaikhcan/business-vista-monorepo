import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const BackDrop = dynamic(() => import('../../../modules/Components/CorematComponents/BackDropDemo'), {
  loading: () => <PageLoader />,
});

const BackDropPage = () => (
  <SecurePage>
    <BackDrop />
  </SecurePage>
);

export default BackDropPage;
