import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const AdvancedCard = dynamic(() => import('../../../modules/Components/CorematComponents/AdvancedCardDemo'), {
  loading: () => <PageLoader />,
});

const AdvancedCardPage = () => (
  <SecurePage>
    <AdvancedCard />
  </SecurePage>
);

export default AdvancedCardPage;
