import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const GridView = dynamic(() => import('../../../modules/Components/CorematComponents/GridViewDemo'), {
  loading: () => <PageLoader />,
});

const GridViewPage = () => (
  <SecurePage>
    <GridView />
  </SecurePage>
);

export default GridViewPage;
