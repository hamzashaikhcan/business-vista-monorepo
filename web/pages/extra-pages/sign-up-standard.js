import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const SignupStandard = dynamic(() => import('../../modules/ExtraPages/sign-up/Standard'), {
  loading: () => <PageLoader />,
});

const SignupStandardPage = () => (
  <SecurePage>
    <SignupStandard />
  </SecurePage>
);

export default SignupStandardPage;
