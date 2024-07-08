import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const News = dynamic(() => import('../../modules/Dashboards/News'), {
  loading: () => <PageLoader />,
});

const NewsDashboard = () => (
  <SecurePage>
    <News />
  </SecurePage>
);

export default NewsDashboard;
