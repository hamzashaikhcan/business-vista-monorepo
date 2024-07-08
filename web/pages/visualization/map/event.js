import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Event = dynamic(() => import('../../../modules/Maps/StreetViewPanorama'), {
  loading: () => <PageLoader />,
});

const EventMapPage = () => (
  <SecurePage>
    <Event />
  </SecurePage>
);

export default EventMapPage;
