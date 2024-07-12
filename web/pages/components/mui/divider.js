import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Divider = dynamic(() => import('../../../modules/Components/MuiComponents/Divider'), {
  loading: () => <PageLoader />,
});

const DividerPage = () => (
  <SecurePage>
    <Divider />
  </SecurePage>
);

export default DividerPage;
