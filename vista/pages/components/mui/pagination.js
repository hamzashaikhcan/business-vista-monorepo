import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Pagination = dynamic(() => import('../../../modules/Components/MuiComponents/Pagination'), {
  loading: () => <PageLoader />,
});

const PaginationPage = () => (
  <SecurePage>
    <Pagination />
  </SecurePage>
);

export default PaginationPage;
