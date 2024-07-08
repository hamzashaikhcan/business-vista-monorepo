import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const RevealCard = dynamic(() => import('../../../modules/Components/CorematComponents/RevealCardDemo'), {
  loading: () => <PageLoader />,
});

const RevealCardPage = () => (
  <SecurePage>
    <RevealCard />
  </SecurePage>
);

export default RevealCardPage;
