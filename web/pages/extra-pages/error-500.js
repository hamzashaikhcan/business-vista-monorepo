import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Error500 = dynamic(() => import('../../modules/ExtraPages/500'), {
  loading: () => <PageLoader />,
});

const Error500Page = () => (
  <SecurePage>
    <Error500 />
  </SecurePage>
);

export default Error500Page;
