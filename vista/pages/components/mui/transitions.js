import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Transitions = dynamic(() => import('../../../modules/Components/MuiComponents/Transitions'), {
  loading: () => <PageLoader />,
});

const TransitionsPage = () => (
  <SecurePage>
    <Transitions />
  </SecurePage>
);

export default TransitionsPage;
