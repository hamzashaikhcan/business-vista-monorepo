import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Table = dynamic(() => import('../../../modules/Components/MuiComponents/Table'), {
  loading: () => <PageLoader />,
});

const TablePage = () => (
  <SecurePage>
    <Table />
  </SecurePage>
);

export default TablePage;
