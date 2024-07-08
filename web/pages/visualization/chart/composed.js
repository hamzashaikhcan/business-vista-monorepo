import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const ComposedChart = dynamic(() => import('../../../modules/Charts/Composed'), {
  loading: () => <PageLoader />,
});

const ComposedChartPage = () => (
  <SecurePage>
    <ComposedChart />
  </SecurePage>
);

export default ComposedChartPage;
