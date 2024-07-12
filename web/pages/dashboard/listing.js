import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Listing = dynamic(() => import('../../modules/Dashboards/Listing'), {
  loading: () => <PageLoader />,
});

const ListingDashboard = () => (
  <SecurePage>
    <Listing />
  </SecurePage>
);

export default ListingDashboard;
