import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Checkbox = dynamic(() => import('../../../modules/Components/MuiComponents/Checkboxes'), {
  loading: () => <PageLoader />,
});

const CheckboxPage = () => (
  <SecurePage>
    <Checkbox />
  </SecurePage>
);

export default CheckboxPage;
