import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const ForgotPasswordStandard = dynamic(() => import('../../modules/ExtraPages/forgot-password/Standard'), {
  loading: () => <PageLoader />,
});

const ForgotPasswordStandardPage = () => (
  <SecurePage>
    <ForgotPasswordStandard />
  </SecurePage>
);

export default ForgotPasswordStandardPage;
