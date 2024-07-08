import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Carousel = dynamic(() => import('../../../modules/Components/CorematComponents/CarouselDemo'), {
  loading: () => <PageLoader />,
});

const CarouselPage = () => (
  <SecurePage>
    <Carousel />
  </SecurePage>
);

export default CarouselPage;
