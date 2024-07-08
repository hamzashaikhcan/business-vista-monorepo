import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Tooltip = dynamic(() => import('../../../modules/Components/MuiComponents/Tooltip'), {
  loading: () => <PageLoader />,
});

const TooltipPage = () => (
  <SecurePage>
    <Tooltip />
  </SecurePage>
);

export default TooltipPage;
