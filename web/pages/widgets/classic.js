import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Classic = dynamic(() => import('../../modules/Widgets/Classic'), {
  loading: () => <PageLoader />,
});

const ClassicWidgetPage = () => (
  <SecurePage>
    <Classic />
  </SecurePage>
);

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default ClassicWidgetPage;
