import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const RadarChart = dynamic(() => import('../../../modules/Charts/Radar'), {
  loading: () => <PageLoader />,
});

const RadarChartPage = () => (
  <SecurePage>
    <RadarChart />
  </SecurePage>
);

export default RadarChartPage;
