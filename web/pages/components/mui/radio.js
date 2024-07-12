import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Radio = dynamic(() => import('../../../modules/Components/MuiComponents/RadioButton'), {
  loading: () => <PageLoader />,
});

const RadioPage = () => (
  <SecurePage>
    <Radio />
  </SecurePage>
);

export default RadioPage;
