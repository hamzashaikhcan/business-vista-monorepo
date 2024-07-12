import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const PieChart = dynamic(() => import('../../../modules/Charts/Pie'), {
  loading: () => <PageLoader />,
});

const PieChartPage = () => (
  <SecurePage>
    <PieChart />
  </SecurePage>
);

export default PieChartPage;
