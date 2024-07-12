import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Badge = dynamic(() => import('../../../modules/Components/MuiComponents/Badge'), {
  loading: () => <PageLoader />,
});

const BadgePage = () => (
  <SecurePage>
    <Badge />
  </SecurePage>
);

export default BadgePage;
