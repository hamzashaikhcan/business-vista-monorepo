import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const SimpleMap = dynamic(() => import('../../../modules/Maps/SimpleMap'), {
  loading: () => <PageLoader />,
});

const SimpleMapPage = () => (
  <SecurePage>
    <SimpleMap />
  </SecurePage>
);

export default SimpleMapPage;
