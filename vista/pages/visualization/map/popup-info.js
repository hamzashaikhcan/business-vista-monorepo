import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const PopupInfo = dynamic(() => import('../../../modules/Maps/MapPopupInfo'), {
  loading: () => <PageLoader />,
});

const PopupInfoMapPage = () => (
  <SecurePage>
    <PopupInfo />
  </SecurePage>
);

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default PopupInfoMapPage;
