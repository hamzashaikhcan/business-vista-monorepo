import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Kml = dynamic(() => import('../../../modules/Maps/MapKmLayer'), {
  loading: () => <PageLoader />,
});

const KmlMapPage = () => (
  <SecurePage>
    <Kml />
  </SecurePage>
);

export default KmlMapPage;
