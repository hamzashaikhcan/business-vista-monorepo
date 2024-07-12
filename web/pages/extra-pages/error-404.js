import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Error404 = dynamic(() => import('../../modules/ExtraPages/404'), {
  loading: () => <PageLoader />,
});

const Error404Page = () => (
  <SecurePage>
    <Error404 />
  </SecurePage>
);

export default Error404Page;
