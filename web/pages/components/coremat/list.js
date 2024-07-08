import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const List = dynamic(() => import('../../../modules/Components/CorematComponents/ListDemo'), {
  loading: () => <PageLoader />,
});

const ListPage = () => (
  <SecurePage>
    <List />
  </SecurePage>
);

export default ListPage;
