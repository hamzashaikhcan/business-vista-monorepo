import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Notifications = dynamic(() => import('../../../modules/Components/CorematComponents/NotificationsDemo'), {
  loading: () => <PageLoader />,
});

const NotificationsPage = () => (
  <SecurePage>
    <Notifications />
  </SecurePage>
);

export default NotificationsPage;
