import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Typography = dynamic(() => import('../../../modules/Components/MuiComponents/Typography'), {
  loading: () => <PageLoader />,
});

const TypographyPage = () => (
  <SecurePage>
    <Typography />
  </SecurePage>
);

export default TypographyPage;
