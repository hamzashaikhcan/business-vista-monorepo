import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const Avatar = dynamic(() => import('../../../modules/Components/MuiComponents/Avatar'), {
  loading: () => <PageLoader />,
});

const AvatarPage = () => (
  <SecurePage>
    <Avatar />
  </SecurePage>
);

export default AvatarPage;
