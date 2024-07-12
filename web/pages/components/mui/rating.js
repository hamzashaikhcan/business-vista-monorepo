import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Rating = dynamic(() => import('../../../modules/Components/MuiComponents/Rating'), {
  loading: () => <PageLoader />,
});

const RatingPage = () => (
  <SecurePage>
    <Rating />
  </SecurePage>
);

export default RatingPage;
