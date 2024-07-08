import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ObjectSummary = dynamic(() => import('../../../modules/Components/CorematComponents/ObjectSummaryDemo'), {
  loading: () => <PageLoader />,
});

const ObjectSummaryPage = () => (
  <SecurePage>
    <ObjectSummary />
  </SecurePage>
);

export default ObjectSummaryPage;
