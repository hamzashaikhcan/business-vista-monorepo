import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const BreadCrumb = dynamic(() => import('../../../modules/Components/MuiComponents/Breadcrumbs'), {
  loading: () => <PageLoader />,
});

const BreadCrumbPage = () => (
  <SecurePage>
    <BreadCrumb />
  </SecurePage>
);

export default BreadCrumbPage;
