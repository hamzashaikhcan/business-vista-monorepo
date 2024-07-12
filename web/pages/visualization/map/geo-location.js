import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const GeoLocation = dynamic(() => import('../../../modules/Maps/GeoLocation'), {
  loading: () => <PageLoader />,
});

const GeoLocationMapPage = () => (
  <SecurePage>
    <GeoLocation />
  </SecurePage>
);

export default GeoLocationMapPage;
