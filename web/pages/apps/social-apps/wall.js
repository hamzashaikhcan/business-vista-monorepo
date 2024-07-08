import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Wall = dynamic(() => import('../../../modules/Apps/Wall'), {
  loading: () => <PageLoader />,
});

const WallPage = () => (
  <SecurePage>
    <Wall />
  </SecurePage>
);

export default WallPage;
