import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const TransferList = dynamic(() => import('../../../modules/Components/MuiComponents/TransferLists'), {
  loading: () => <PageLoader />,
});

const TransferListPage = () => (
  <SecurePage>
    <TransferList />
  </SecurePage>
);

export default TransferListPage;
