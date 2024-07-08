import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../authentication/auth-page-wrappers/SecurePage';

const ForgotPassword = dynamic(() => import('../../modules/ExtraPages/forgot-password/Default'), {
  loading: () => <PageLoader />,
});

const ForgotPasswordPage = () => (
  <SecurePage>
    <ForgotPassword />
  </SecurePage>
);

export default ForgotPasswordPage;
