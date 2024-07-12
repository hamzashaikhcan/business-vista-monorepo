import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Slider = dynamic(() => import('../../../modules/Components/MuiComponents/Slider'), {
  loading: () => <PageLoader />,
});

const SliderPage = () => (
  <SecurePage>
    <Slider />
  </SecurePage>
);

export default SliderPage;
