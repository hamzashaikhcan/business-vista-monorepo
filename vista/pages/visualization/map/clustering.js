import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Clustering = dynamic(() => import('../../../modules/Maps/MarkerClusterer'), {
  loading: () => <PageLoader />,
});

const ClusteringMapPage = () => (
  <SecurePage>
    <Clustering />
  </SecurePage>
);

export default ClusteringMapPage;
