import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const AutoComplete = dynamic(() => import('../../../modules/Components/MuiComponents/AutoComplete'), {
  loading: () => <PageLoader />,
});

const AutoCompletePage = () => (
  <SecurePage>
    <AutoComplete />
  </SecurePage>
);

export default AutoCompletePage;
