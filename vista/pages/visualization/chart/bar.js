import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const BarChart = dynamic(() => import('../../../modules/Charts/Bar'), {
  loading: () => <PageLoader />,
});

const BarChartPage = () => (
  <SecurePage>
    <BarChart />
  </SecurePage>
);

export default BarChartPage;
