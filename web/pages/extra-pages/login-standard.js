import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const LoginStandard = dynamic(() => import('../../modules/ExtraPages/sign-in/Standard'), {
  loading: () => <PageLoader />,
});

const LoginStandardPage = () => (
  <SecurePage>
    <LoginStandard />
  </SecurePage>
);

export default LoginStandardPage;
