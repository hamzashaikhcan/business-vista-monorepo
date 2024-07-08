import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const StreetView = dynamic(() => import('../../../modules/Maps/StreetViewPanorama'), {
  loading: () => <PageLoader />,
});

const StreetViewMapPage = () => (
  <SecurePage>
    <StreetView />
  </SecurePage>
);

export default StreetViewMapPage;
