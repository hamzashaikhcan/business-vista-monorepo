import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const TextField = dynamic(() => import('../../../modules/Components/MuiComponents/TextFields'), {
  loading: () => <PageLoader />,
});

const TextFieldPage = () => (
  <SecurePage>
    <TextField />
  </SecurePage>
);

export default TextFieldPage;
