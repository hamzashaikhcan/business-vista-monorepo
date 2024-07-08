import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const GroupList = dynamic(() => import('../../../modules/Components/CorematComponents/GroupListDemo'), {
  loading: () => <PageLoader />,
});

const GroupListPage = () => (
  <SecurePage>
    <GroupList />
  </SecurePage>
);

export default GroupListPage;
