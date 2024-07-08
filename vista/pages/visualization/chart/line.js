import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const LineChart = dynamic(() => import('../../../modules/Charts/Line'), {
  loading: () => <PageLoader />,
});

const LineChartPage = () => (
  <SecurePage>
    <LineChart />
  </SecurePage>
);

export default LineChartPage;
