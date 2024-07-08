import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Ecommerce = dynamic(() => import('../../modules/Dashboards/ECommerce'), {
  loading: () => <PageLoader />,
});

const EcommerceDashboard = () => (
  <SecurePage>
    <Ecommerce />
  </SecurePage>
);

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default EcommerceDashboard;
