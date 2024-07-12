import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const Signup = dynamic(() => import('../../modules/ExtraPages/sign-up/Default'), {
  loading: () => <PageLoader />,
});

const SignupPage = () => (
  <SecurePage>
    <Signup />
  </SecurePage>
);

export default SignupPage;
