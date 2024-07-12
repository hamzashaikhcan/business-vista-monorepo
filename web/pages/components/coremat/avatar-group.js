import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '../../../@jumbo/components/PageComponents/PageLoader';
import SecurePage from '../../../authentication/auth-page-wrappers/SecurePage';

const AvatarGroup = dynamic(() => import('../../../modules/Components/CorematComponents/AvatarGroupDemo'), {
  loading: () => <PageLoader />,
});

const AvatarGroupPage = () => (
  <SecurePage>
    <AvatarGroup />
  </SecurePage>
);

export default AvatarGroupPage;
