import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Overlay = dynamic(() => import('../../../modules/Maps/MapOverlay'), {
  loading: () => <PageLoader />,
});

const OverlayMapPage = () => (
  <SecurePage>
    <Overlay />
  </SecurePage>
);

export default OverlayMapPage;
