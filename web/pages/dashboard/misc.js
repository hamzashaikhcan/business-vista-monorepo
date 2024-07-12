import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Misc = dynamic(() => import('../../modules/Dashboards/Misc'), {
  loading: () => <PageLoader />,
});

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const MiscDashboard = () => (
  <SecurePage>
    <Misc />
  </SecurePage>
);

export default MiscDashboard;
