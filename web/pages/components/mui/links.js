import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Links = dynamic(() => import('../../../modules/Components/MuiComponents/Links'), {
  loading: () => <PageLoader />,
});

const LinksPage = () => (
  <SecurePage>
    <Links />
  </SecurePage>
);

export default LinksPage;
