import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ScatterChart = dynamic(() => import('../../../modules/Charts/Scatter'), {
  loading: () => <PageLoader />,
});

const ScatterChartPage = () => (
  <SecurePage>
    <ScatterChart />
  </SecurePage>
);

export default ScatterChartPage;
