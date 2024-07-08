import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const TreeMap = dynamic(() => import('../../../modules/Charts/Treemap'), {
  loading: () => <PageLoader />,
});

const TreeMapPage = () => (
  <SecurePage>
    <TreeMap />
  </SecurePage>
);

export default TreeMapPage;
