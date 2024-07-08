import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Login = dynamic(() => import('../../modules/ExtraPages/sign-in/Default'), {
  loading: () => <PageLoader />,
});

const LoginPage = () => (
  <SecurePage>
    <Login />
  </SecurePage>
);

export default LoginPage;
