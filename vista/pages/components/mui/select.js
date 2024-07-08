import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Select = dynamic(() => import('../../../modules/Components/MuiComponents/Selects'), {
  loading: () => <PageLoader />,
});

const SelectPage = () => (
  <SecurePage>
    <Select />
  </SecurePage>
);

export default SelectPage;
