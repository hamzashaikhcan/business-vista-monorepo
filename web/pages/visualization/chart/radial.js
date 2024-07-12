import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const RadialChart = dynamic(() => import('../../../modules/Charts/Radial'), {
  loading: () => <PageLoader />,
});

const RadialChartPage = () => (
  <SecurePage>
    <RadialChart />
  </SecurePage>
);

export default RadialChartPage;
