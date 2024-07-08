import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Stepper = dynamic(() => import('../../../modules/Components/MuiComponents/Stepper'), {
  loading: () => <PageLoader />,
});

const StepperPage = () => (
  <SecurePage>
    <Stepper />
  </SecurePage>
);

export default StepperPage;
