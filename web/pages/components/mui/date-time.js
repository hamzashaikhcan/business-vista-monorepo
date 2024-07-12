import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const DateTime = dynamic(() => import('../../../modules/Components/MuiComponents/Pickers'), {
  loading: () => <PageLoader />,
});

const DateTimePage = () => (
  <SecurePage>
    <DateTime />
  </SecurePage>
);

export default DateTimePage;
