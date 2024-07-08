import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ExpendableCard = dynamic(() => import('../../../modules/Components/CorematComponents/ExpendableCardDemo'), {
  loading: () => <PageLoader />,
});

const ExpendableCardPage = () => (
  <SecurePage>
    <ExpendableCard />
  </SecurePage>
);

export default ExpendableCardPage;
