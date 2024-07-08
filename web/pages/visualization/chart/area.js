import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const AreaChart = dynamic(() => import('../../../modules/Charts/Area'), {
  loading: () => <PageLoader />,
});

const AreaChartPage = () => (
  <SecurePage>
    <AreaChart />
  </SecurePage>
);

export default AreaChartPage;
